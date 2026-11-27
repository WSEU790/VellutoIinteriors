import { z } from 'zod';
import { BUDGET_RANGES, LEAD_LIMITS, RENOVATION_TYPES, TIMELINES } from './leadOptions.js';

/**
 * Lead domain model — the foundation for future CRM features
 * (status pipeline, consultations, estimates, follow-ups).
 */
export const LEAD_STATUSES = ['new', 'contacted', 'consultation_scheduled', 'estimate_sent', 'won', 'lost', 'archived'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const leadInputSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(LEAD_LIMITS.nameMax),
  email: z.string().trim().toLowerCase().max(LEAD_LIMITS.emailMax).pipe(z.email('Please enter a valid email address.')),
  phone: z
    .string()
    .trim()
    .max(LEAD_LIMITS.phoneMax)
    .refine((v) => {
      const d = v.replace(/\D/g, '').length;
      return d >= 10 && d <= 15;
    }, 'Please enter a valid phone number, including area code.'),
  location: z.string().trim().min(5, 'Please enter the project address or ZIP code.').max(LEAD_LIMITS.addressMax),
  renovationType: z.enum(RENOVATION_TYPES, { error: 'Please select a renovation type.' }),
  budget: z.enum(BUDGET_RANGES, { error: 'Please select an estimated budget.' }),
  timeline: z.enum(TIMELINES, { error: 'Please select a desired timeline.' }),
  description: z.string().trim().min(LEAD_LIMITS.descriptionMin, `Please tell us a little more (at least ${LEAD_LIMITS.descriptionMin} characters).`).max(LEAD_LIMITS.descriptionMax),
  consent: z.literal('true', { error: 'Please confirm we may contact you about your project.' }),
});
export type LeadInput = z.infer<typeof leadInputSchema>;

export interface LeadAttachment {
  id: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
}

export interface LeadNote {
  at: string;
  text: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  source: 'website';
  name: string;
  email: string;
  phone: string;
  location: string;
  renovationType: string;
  budget: string;
  timeline: string;
  description: string;
  consentAt: string;
  attachments: LeadAttachment[];
  /** Future CRM fields */
  consultationAt?: string | null;
  estimateAmount?: number | null;
  nextFollowUpAt?: string | null;
  notes: LeadNote[];
  meta: { ip?: string; userAgent?: string; referrer?: string };
}

export const leadUpdateSchema = z
  .object({
    status: z.enum(LEAD_STATUSES).optional(),
    consultationAt: z.iso.datetime().nullable().optional(),
    estimateAmount: z.number().nonnegative().nullable().optional(),
    nextFollowUpAt: z.iso.datetime().nullable().optional(),
    note: z.string().trim().min(1).max(4000).optional(),
  })
  .strict();
export type LeadUpdate = z.infer<typeof leadUpdateSchema>;
