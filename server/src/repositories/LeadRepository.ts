import type { Lead, LeadStatus, LeadUpdate } from '../domain/lead.js';

/**
 * Storage abstraction. Swap implementations (JSON file, PostgreSQL, external CRM)
 * without touching route handlers.
 */
export interface LeadRepository {
  init(): Promise<void>;
  create(lead: Lead): Promise<Lead>;
  get(id: string): Promise<Lead | null>;
  list(opts?: { status?: LeadStatus; limit?: number; offset?: number }): Promise<{ items: Lead[]; total: number }>;
  update(id: string, patch: LeadUpdate): Promise<Lead | null>;
}

export function applyUpdate(lead: Lead, patch: LeadUpdate): Lead {
  const now = new Date().toISOString();
  const next: Lead = { ...lead, updatedAt: now, notes: [...lead.notes] };
  if (patch.status) next.status = patch.status;
  if (patch.consultationAt !== undefined) next.consultationAt = patch.consultationAt;
  if (patch.estimateAmount !== undefined) next.estimateAmount = patch.estimateAmount;
  if (patch.nextFollowUpAt !== undefined) next.nextFollowUpAt = patch.nextFollowUpAt;
  if (patch.note) next.notes.push({ at: now, text: patch.note });
  return next;
}
