import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Lead, LeadStatus, LeadUpdate } from '../domain/lead.js';
import { applyUpdate, type LeadRepository } from './LeadRepository.js';

/**
 * Zero-dependency storage: one JSON file per lead under STORAGE_DIR/leads.
 * Suitable for a single VPS with low-to-moderate volume. Use PostgreSQL for scale.
 */
export class JsonFileLeadRepository implements LeadRepository {
  private dir: string;
  constructor(storageDir: string) {
    this.dir = path.join(storageDir, 'leads');
  }
  async init() {
    await mkdir(this.dir, { recursive: true, mode: 0o750 });
  }
  private file(id: string) {
    if (!/^[A-Za-z0-9-]+$/.test(id)) throw new Error('Invalid lead id');
    return path.join(this.dir, `${id}.json`);
  }
  private async write(lead: Lead) {
    const tmp = `${this.file(lead.id)}.tmp`;
    await writeFile(tmp, JSON.stringify(lead, null, 2), { mode: 0o640 });
    await rename(tmp, this.file(lead.id));
  }
  async create(lead: Lead) {
    await this.write(lead);
    return lead;
  }
  async get(id: string) {
    try {
      return JSON.parse(await readFile(this.file(id), 'utf8')) as Lead;
    } catch {
      return null;
    }
  }
  async list({ status, limit = 50, offset = 0 }: { status?: LeadStatus; limit?: number; offset?: number } = {}) {
    const files = (await readdir(this.dir)).filter((f) => f.endsWith('.json'));
    const all = (await Promise.all(files.map(async (f) => JSON.parse(await readFile(path.join(this.dir, f), 'utf8')) as Lead)))
      .filter((l) => !status || l.status === status)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return { items: all.slice(offset, offset + limit), total: all.length };
  }
  async update(id: string, patch: LeadUpdate) {
    const lead = await this.get(id);
    if (!lead) return null;
    const next = applyUpdate(lead, patch);
    await this.write(next);
    return next;
  }
}
