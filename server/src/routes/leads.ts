import { randomUUID, timingSafeEqual } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Router, type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';
import { LEAD_STATUSES, leadInputSchema, leadUpdateSchema, type Lead, type LeadAttachment, type LeadStatus } from '../domain/lead.js';
import type { LeadRepository } from '../repositories/LeadRepository.js';
import { dispatch, type LeadNotifier } from '../notifications/notifier.js';

/** Identify real image content by magic bytes — never trust the client MIME type alone. */
function sniffImage(buf: Buffer): { mime: string; ext: string } | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { mime: 'image/jpeg', ext: 'jpg' };
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { mime: 'image/png', ext: 'png' };
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return { mime: 'image/webp', ext: 'webp' };
  if (buf.toString('ascii', 4, 8) === 'ftyp') {
    const brand = buf.toString('ascii', 8, 12);
    if (['heic', 'heix', 'hevc', 'heim', 'heis', 'mif1', 'msf1'].includes(brand)) return { mime: 'image/heic', ext: 'heic' };
  }
  return null;
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!config.adminToken) return res.status(404).json({ error: 'Not found' });
  const given = Buffer.from((req.get('authorization') ?? '').replace(/^Bearer\s+/i, ''));
  const expected = Buffer.from(config.adminToken);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

export function leadsRouter(repo: LeadRepository, notifiers: LeadNotifier[]) {
  const router = Router();

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { files: config.uploadMaxFiles, fileSize: config.uploadMaxBytes, fields: 20, fieldSize: 16 * 1024 },
  });

  const submitLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 8,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many submissions. Please wait a few minutes and try again.' },
  });

  router.post('/', submitLimiter, (req, res, next) => {
    upload.array('images', config.uploadMaxFiles)(req, res, (err: unknown) => {
      if (err instanceof multer.MulterError) {
        const msg =
          err.code === 'LIMIT_FILE_SIZE'
            ? `Each image must be under ${Math.round(config.uploadMaxBytes / 1024 / 1024)} MB.`
            : err.code === 'LIMIT_FILE_COUNT' || err.code === 'LIMIT_UNEXPECTED_FILE'
              ? `Please attach no more than ${config.uploadMaxFiles} images.`
              : 'Your upload could not be processed.';
        return res.status(400).json({ error: msg, fieldErrors: { images: msg } });
      }
      if (err) return next(err);
      next();
    });
  });

  router.post('/', async (req, res, next) => {
    try {
      // Honeypot: real visitors never fill this hidden field. Silently discard bots.
      if (typeof req.body.website === 'string' && req.body.website.trim() !== '') {
        console.warn('[lead] honeypot triggered; submission discarded');
        return res.status(201).json({ id: 'received', receivedAt: new Date().toISOString() });
      }

      const body: Record<string, unknown> = { ...req.body };
      for (const k of ['name', 'email', 'phone', 'location', 'renovationType', 'budget', 'timeline', 'description', 'consent']) body[k] ??= '';
      const parsed = leadInputSchema.safeParse(body);
      if (!parsed.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          const k = String(issue.path[0] ?? 'form');
          fieldErrors[k] ??= issue.message;
        }
        return res.status(422).json({ error: 'Please review the highlighted fields.', fieldErrors });
      }

      const files = (req.files as Express.Multer.File[] | undefined) ?? [];
      const sniffed = files.map((f) => sniffImage(f.buffer));
      if (sniffed.some((s) => !s)) {
        const msg = 'Please upload JPG, PNG, WEBP or HEIC images only.';
        return res.status(400).json({ error: msg, fieldErrors: { images: msg } });
      }

      const id = randomUUID();
      const now = new Date().toISOString();
      const attachments: LeadAttachment[] = [];
      if (files.length) {
        const dir = path.join(config.storageDir, 'uploads', id);
        await mkdir(dir, { recursive: true, mode: 0o750 });
        for (const [i, f] of files.entries()) {
          const s = sniffed[i]!;
          const attId = randomUUID();
          const storedName = `${attId}.${s.ext}`;
          await writeFile(path.join(dir, storedName), f.buffer, { mode: 0o640 });
          attachments.push({ id: attId, originalName: f.originalname.slice(0, 200), storedName, mimeType: s.mime, size: f.size });
        }
      }

      const { consent: _consent, ...input } = parsed.data;
      const lead: Lead = {
        id,
        createdAt: now,
        updatedAt: now,
        status: 'new',
        source: 'website',
        ...input,
        consentAt: now,
        attachments,
        consultationAt: null,
        estimateAmount: null,
        nextFollowUpAt: null,
        notes: [],
        meta: { ip: req.ip, userAgent: req.get('user-agent')?.slice(0, 300), referrer: req.get('referer')?.slice(0, 300) },
      };
      await repo.create(lead);
      void dispatch(notifiers, lead);
      res.status(201).json({ id: lead.id, receivedAt: lead.createdAt });
    } catch (err) {
      next(err);
    }
  });

  // ---- Admin / CRM endpoints (disabled unless ADMIN_API_TOKEN is set) ----
  router.get('/', requireAdmin, async (req, res, next) => {
    try {
      const status = LEAD_STATUSES.includes(req.query.status as LeadStatus) ? (req.query.status as LeadStatus) : undefined;
      const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 50));
      const offset = Math.max(0, Number(req.query.offset) || 0);
      res.json(await repo.list({ status, limit, offset }));
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', requireAdmin, async (req, res, next) => {
    try {
      const lead = await repo.get(req.params.id!);
      return lead ? res.json(lead) : res.status(404).json({ error: 'Lead not found' });
    } catch (err) {
      next(err);
    }
  });

  router.patch('/:id', requireAdmin, async (req, res, next) => {
    try {
      const parsed = leadUpdateSchema.safeParse(req.body);
      if (!parsed.success) return res.status(422).json({ error: 'Invalid update', issues: parsed.error.issues });
      const lead = await repo.update(req.params.id!, parsed.data);
      return lead ? res.json(lead) : res.status(404).json({ error: 'Lead not found' });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
