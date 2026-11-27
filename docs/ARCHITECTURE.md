# Architecture

## Overview

```
Browser ──► Nginx (TLS, gzip) ──► Node/Express (PORT 3001)
                                   ├── /api/*        JSON API (leads)
                                   └── /*            static SPA from dist/ (index.html fallback)
                                          │
                              LeadRepository (json | postgres)
                              LeadNotifier[] (log, webhook, …)
```

A single Node process serves both the API and the compiled React app. That keeps VPS hosting simple: one service, one port, one reverse proxy.

## Front end (`src/`)

- **Routing:** React Router 7 with lazy-loaded pages (`src/App.tsx`). The home page is eagerly loaded for the fastest first paint.
- **Content as data:** all marketing copy that changes over time lives in `src/data/*.ts` (services, projects, areas, testimonials, site config). Pages render from these arrays. The sitemap generator reads them too, so new entries appear in `sitemap.xml` automatically.
- **SEO:** `components/Seo.tsx` sets the title, description, canonical URL, Open Graph and Twitter tags, plus JSON-LD per page through react-helmet-async. `lib/schema.ts` builds schema.org objects and includes only configured business details.
- **Design system:** Tailwind with brand tokens (`onyx`, `ivory`, `champagne`, `gold`) and component classes (`btn-gold`, `eyebrow`, `field`, …) in `src/styles/index.css`. Typefaces are Cormorant Garamond (display) and Jost (text).
- **Motion:** `Reveal` uses IntersectionObserver for subtle entrance animations. It honours `prefers-reduced-motion`.
- **API access:** only through `src/lib/api.ts`, so the backend can be swapped without touching UI code. `VITE_API_BASE_URL` can point the site at a separately hosted API.

## API (`server/src/`)

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | – | Liveness check |
| POST | `/api/leads` | – (rate-limited: 8 per 15 min per IP) | Create a lead (multipart form plus `images[]`) |
| GET | `/api/leads?status=&limit=&offset=` | Bearer `ADMIN_API_TOKEN` | List leads |
| GET | `/api/leads/:id` | Bearer | Lead detail |
| PATCH | `/api/leads/:id` | Bearer | Update status, consultation date, estimate amount, follow-up date or add a note |

Admin routes return 404 when `ADMIN_API_TOKEN` is unset.

### Lead submission pipeline

1. Multer parses multipart data into memory and enforces the file count and size limits.
2. The honeypot check runs: the `website` field must be empty. Bot submissions are discarded silently.
3. Zod validates against `domain/lead.ts`. The option lists are shared with the React form through `domain/leadOptions.ts`.
4. Each upload is verified by **magic bytes** (JPEG, PNG, WEBP or HEIC). Client MIME types are not trusted.
5. Files are written to `STORAGE_DIR/uploads/<leadId>/` with random names. The lead is persisted through `LeadRepository`.
6. Notifiers run asynchronously. A notifier failure is logged but never fails the customer's submission, because the lead is already stored.
7. The API responds `201 { id, receivedAt }`. The UI shows success **only** after this response.

### Security

- Helmet sets a strict Content Security Policy (self, plus Google Fonts), `frame-ancestors 'none'` and related headers.
- Request limits: 64 KB for JSON bodies and bounded multipart fields and files.
- Admin tokens are compared in constant time.
- Secrets come only from `.env`, which git ignores.
- Uploaded files live outside the web root and are never served publicly.

## Extending

- **New page:** add a component in `src/pages/`, a route in `App.tsx` and the path in `scripts/generate-sitemap.ts`.
- **New storage backend:** implement `LeadRepository` and register it in `repositories/index.ts`.
- **New notification channel (email or SMS):** implement `LeadNotifier` and add it in `createNotifiers()`.
