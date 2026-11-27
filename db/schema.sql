-- Velluto Interiors — PostgreSQL schema for lead / CRM data.
-- Apply once:  psql "$DATABASE_URL" -f db/schema.sql
-- Then set LEAD_STORAGE=postgres in .env.

CREATE TABLE IF NOT EXISTS leads (
  id                 UUID PRIMARY KEY,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  status             TEXT NOT NULL DEFAULT 'new'
                     CHECK (status IN ('new','contacted','consultation_scheduled','estimate_sent','won','lost','archived')),
  source             TEXT NOT NULL DEFAULT 'website',
  name               TEXT NOT NULL,
  email              TEXT NOT NULL,
  phone              TEXT NOT NULL,
  location           TEXT NOT NULL,
  renovation_type    TEXT NOT NULL,
  budget             TEXT NOT NULL,
  timeline           TEXT NOT NULL,
  description        TEXT NOT NULL,
  consent_at         TIMESTAMPTZ NOT NULL,
  attachments        JSONB NOT NULL DEFAULT '[]'::jsonb,
  consultation_at    TIMESTAMPTZ,
  estimate_amount    NUMERIC(12,2),
  next_follow_up_at  TIMESTAMPTZ,
  notes              JSONB NOT NULL DEFAULT '[]'::jsonb,
  meta               JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (lower(email));
CREATE INDEX IF NOT EXISTS leads_follow_up_idx ON leads (next_follow_up_at) WHERE next_follow_up_at IS NOT NULL;

-- Future CRM expansion (not yet used by the application):
-- customers(id, name, email, phone, ...)          -- dedupe leads into customer records
-- consultations(id, lead_id, scheduled_for, ...)  -- calendar / scheduling
-- estimates(id, lead_id, amount, status, ...)     -- estimate requests and proposals
-- activities(id, lead_id, type, body, at, ...)    -- follow-up history
