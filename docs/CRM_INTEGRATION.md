# CRM Integration

The site captures leads through its own API and stores them durably. Three integration paths are ready, from simplest to most complete.

## 1. Webhook (no code)

Set `LEAD_WEBHOOK_URL` (and optionally `LEAD_WEBHOOK_SECRET`) in `.env`. Every new lead is POSTed as:

```json
{ "event": "lead.created", "lead": { "id": "…", "createdAt": "…", "status": "new", "name": "…", "email": "…", "phone": "…",
  "location": "…", "renovationType": "…", "budget": "…", "timeline": "…", "description": "…", "attachments": [ … ], "notes": [] } }
```

Point it at Zapier, Make, n8n or a CRM's inbound webhook to create contacts or deals and to send email alerts. Verify the `X-Webhook-Secret` header on the receiving side. Request metadata (IP address, user agent) is never sent.

## 2. Admin API

Set `ADMIN_API_TOKEN` to a long random value. Then:

```bash
curl -H "Authorization: Bearer $TOKEN" https://your-domain.com/api/leads?status=new
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"status":"consultation_scheduled","consultationAt":"2027-01-15T15:00:00Z","note":"Site visit booked"}' \
  https://your-domain.com/api/leads/<id>
```

Updatable fields: `status`, `consultationAt`, `estimateAmount`, `nextFollowUpAt`, `note` (appended to the notes history).

The statuses are `new`, `contacted`, `consultation_scheduled`, `estimate_sent`, `won`, `lost` and `archived`.

## 3. Custom notifier or repository (code)

- **Email notifications:** implement `LeadNotifier` in `server/src/notifications/` (for example with an SMTP library or a transactional email provider) and register it in `createNotifiers()`. Keep credentials in `.env`.
- **Direct CRM sync:** implement a notifier that calls the CRM's API. Alternatively, implement `LeadRepository` if the CRM should be the system of record.
- **PostgreSQL:** `db/schema.sql` already includes indexes for the status, follow-up and email queries an internal dashboard would need. Comments in that file outline the planned `customers`, `consultations`, `estimates` and `activities` tables.

## Not yet implemented

These are deliberately out of scope until the business chooses its tools:

- Outbound email delivery
- A staff dashboard UI
- Calendar-based consultation booking

The data model and API are shaped to add each one without breaking changes.
