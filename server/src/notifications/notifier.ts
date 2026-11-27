import { config } from '../config/env.js';
import type { Lead } from '../domain/lead.js';

/**
 * Notification hooks for new leads. Add an email/SMS/CRM notifier by
 * implementing `LeadNotifier` and registering it in `createNotifiers()`.
 * Notifier failures are logged and never fail the customer's submission —
 * the lead is already safely stored.
 */
export interface LeadNotifier {
  name: string;
  notify(lead: Lead): Promise<void>;
}

class LogNotifier implements LeadNotifier {
  name = 'log';
  async notify(lead: Lead) {
    console.info(`[lead] new ${lead.renovationType} inquiry ${lead.id} (${lead.attachments.length} attachment(s))`);
  }
}

class WebhookNotifier implements LeadNotifier {
  name = 'webhook';
  constructor(private url: string, private secret?: string) {}
  async notify(lead: Lead) {
    const { meta: _meta, ...payload } = lead;
    const res = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(this.secret ? { 'X-Webhook-Secret': this.secret } : {}) },
      body: JSON.stringify({ event: 'lead.created', lead: payload }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  }
}

export function createNotifiers(): LeadNotifier[] {
  const list: LeadNotifier[] = [new LogNotifier()];
  if (config.webhookUrl) list.push(new WebhookNotifier(config.webhookUrl, config.webhookSecret));
  return list;
}

export async function dispatch(notifiers: LeadNotifier[], lead: Lead) {
  await Promise.all(
    notifiers.map((n) => n.notify(lead).catch((err: unknown) => console.error(`[notify:${n.name}] failed for lead ${lead.id}:`, err instanceof Error ? err.message : err))),
  );
}
