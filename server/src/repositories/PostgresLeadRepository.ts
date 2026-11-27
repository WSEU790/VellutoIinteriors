import pg from 'pg';
import type { Lead, LeadStatus, LeadUpdate } from '../domain/lead.js';
import { applyUpdate, type LeadRepository } from './LeadRepository.js';

/**
 * PostgreSQL storage. Schema: db/schema.sql (run it once before enabling).
 * Enable with LEAD_STORAGE=postgres and DATABASE_URL.
 */
export class PostgresLeadRepository implements LeadRepository {
  private pool: pg.Pool;
  constructor(connectionString: string) {
    this.pool = new pg.Pool({ connectionString, max: 10 });
  }
  async init() {
    await this.pool.query('SELECT 1 FROM leads LIMIT 1');
  }
  private static fromRow(r: Record<string, unknown>): Lead {
    const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : (v as string | null));
    return {
      id: r.id as string,
      createdAt: iso(r.created_at)!,
      updatedAt: iso(r.updated_at)!,
      status: r.status as LeadStatus,
      source: 'website',
      name: r.name as string,
      email: r.email as string,
      phone: r.phone as string,
      location: r.location as string,
      renovationType: r.renovation_type as string,
      budget: r.budget as string,
      timeline: r.timeline as string,
      description: r.description as string,
      consentAt: iso(r.consent_at)!,
      attachments: (r.attachments as Lead['attachments']) ?? [],
      consultationAt: iso(r.consultation_at),
      estimateAmount: r.estimate_amount === null || r.estimate_amount === undefined ? null : Number(r.estimate_amount),
      nextFollowUpAt: iso(r.next_follow_up_at),
      notes: (r.notes as Lead['notes']) ?? [],
      meta: (r.meta as Lead['meta']) ?? {},
    };
  }
  async create(l: Lead) {
    await this.pool.query(
      `INSERT INTO leads (id, created_at, updated_at, status, source, name, email, phone, location, renovation_type, budget, timeline, description, consent_at, attachments, notes, meta)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [l.id, l.createdAt, l.updatedAt, l.status, l.source, l.name, l.email, l.phone, l.location, l.renovationType, l.budget, l.timeline, l.description, l.consentAt, JSON.stringify(l.attachments), JSON.stringify(l.notes), JSON.stringify(l.meta)],
    );
    return l;
  }
  async get(id: string) {
    const { rows } = await this.pool.query('SELECT * FROM leads WHERE id = $1', [id]);
    return rows[0] ? PostgresLeadRepository.fromRow(rows[0]) : null;
  }
  async list({ status, limit = 50, offset = 0 }: { status?: LeadStatus; limit?: number; offset?: number } = {}) {
    const where = status ? 'WHERE status = $3' : '';
    const params: unknown[] = [limit, offset];
    if (status) params.push(status);
    const { rows } = await this.pool.query(`SELECT *, COUNT(*) OVER() AS total FROM leads ${where} ORDER BY created_at DESC LIMIT $1 OFFSET $2`, params);
    return { items: rows.map(PostgresLeadRepository.fromRow), total: rows[0] ? Number(rows[0].total) : 0 };
  }
  async update(id: string, patch: LeadUpdate) {
    const lead = await this.get(id);
    if (!lead) return null;
    const n = applyUpdate(lead, patch);
    await this.pool.query(
      `UPDATE leads SET updated_at=$2, status=$3, consultation_at=$4, estimate_amount=$5, next_follow_up_at=$6, notes=$7 WHERE id=$1`,
      [id, n.updatedAt, n.status, n.consultationAt ?? null, n.estimateAmount ?? null, n.nextFollowUpAt ?? null, JSON.stringify(n.notes)],
    );
    return n;
  }
}
