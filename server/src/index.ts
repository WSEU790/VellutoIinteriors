import { existsSync } from 'node:fs';
import path from 'node:path';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config/env.js';
import { createLeadRepository } from './repositories/index.js';
import { createNotifiers } from './notifications/notifier.js';
import { leadsRouter } from './routes/leads.js';

async function main() {
  const repo = createLeadRepository();
  await repo.init();
  const notifiers = createNotifiers();

  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'blob:'],
          connectSrc: ["'self'"],
          frameAncestors: ["'none'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: config.isProd ? [] : null,
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );
  if (config.corsOrigins.length) app.use('/api', cors({ origin: config.corsOrigins }));
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => res.json({ ok: true, storage: config.leadStorage }));
  app.use('/api/leads', leadsRouter(repo, notifiers));
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

  // Serve the built React app in production (single-process VPS deployment).
  if (existsSync(config.staticDir)) {
    app.use(
      express.static(config.staticDir, {
        index: false,
        setHeaders(res, filePath) {
          if (filePath.includes(`${path.sep}assets${path.sep}`)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          else res.setHeader('Cache-Control', 'public, max-age=3600');
        },
      }),
    );
    app.get('*', (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(config.staticDir, 'index.html'));
    });
  }

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[error]', err);
    res.status(500).json({ error: 'Something went wrong on our side. Please try again shortly.' });
  });

  app.listen(config.port, () => console.info(`Velluto API listening on :${config.port} (storage: ${config.leadStorage})`));
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
