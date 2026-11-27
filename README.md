# Velluto Interiors

Production website for **Velluto Interiors**, a luxury kitchen remodeling, custom cabinetry and interior renovation studio serving South Florida (Boca Raton, Fort Lauderdale, Pompano Beach, Palm Beach and surrounding communities).

> *Where Craftsmanship Meets Distinction.*

## Features

- **Pages:** Home, Services (plus 9 service detail pages), Portfolio (category filter, project detail pages with before/after slider and gallery), About, Service Areas (plus 6 local landing pages), Request Consultation and a 404 page.
- **Lead capture:** a validated consultation form with image uploads (up to 6 × 10 MB, JPG/PNG/WEBP/HEIC), a honeypot spam trap, rate limiting, magic-byte image verification and accessible error and success states.
- **CRM foundation:** a lead model with a status pipeline (`new → contacted → consultation_scheduled → estimate_sent → won/lost`), consultation date, estimate amount, follow-up date and notes. Storage is pluggable (JSON files or PostgreSQL), there is an optional webhook notifier, and an authenticated admin API.
- **SEO:** per-page titles, descriptions, canonical URLs, Open Graph and Twitter tags, JSON-LD (`HomeAndConstructionBusiness`, `Service`, `BreadcrumbList`), a generated `sitemap.xml` and `robots.txt`, local service-area content and descriptive alt text.
- **Quality:** responsive from 320 px up, keyboard and screen-reader friendly (skip link, labelled fields, `aria-invalid`, focus management), reduced-motion support, route-level code splitting, security headers (Helmet CSP) and immutable asset caching.

## Tech stack

| Layer | Technology |
| --- | --- |
| Front end | React 18, TypeScript, Vite 7, Tailwind CSS 3, React Router 7, react-helmet-async |
| API | Node.js ≥ 20, Express 4, Multer 2, Zod 4, Helmet, express-rate-limit |
| Data | JSON-file repository (default) or PostgreSQL (`pg`, schema in `db/schema.sql`) |
| Deployment | A single Node process serves the API and the built SPA behind Nginx on any VPS |

## Getting started

```bash
git clone https://github.com/WSEU790/VellutoIinteriors.git
cd VellutoIinteriors
cp .env.example .env        # then edit values
npm install
npm run dev                 # web on http://localhost:5173, API on :3001 (proxied at /api)
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the Vite dev server and the API with hot reload |
| `npm run typecheck` | Runs strict TypeScript checks on the front end and the server |
| `npm run build` | Typechecks, generates the sitemap and robots.txt, builds the SPA to `dist/` and compiles the server to `server/dist/` |
| `npm start` | Runs the production server (API plus static site) |
| `npm run images` | Regenerates the sample illustrations in `public/images/samples/` |

## Project structure

```
├── src/                    React application
│   ├── components/         Header, Footer, Seo, BeforeAfter, ProjectCard, …
│   ├── pages/              Route components (lazy-loaded)
│   ├── data/               Editable content: site config, services, projects, areas, testimonials
│   ├── lib/                API client, JSON-LD builders, hooks
│   └── styles/             Tailwind layers and brand components
├── server/src/             Express API
│   ├── config/             Environment parsing
│   ├── domain/             Lead model, validation and shared form options
│   ├── repositories/       LeadRepository interface plus JSON and PostgreSQL implementations
│   ├── notifications/      Lead notifiers (log, webhook)
│   └── routes/             /api/leads
├── public/                 Static assets, sample imagery, robots.txt, sitemap.xml
├── db/schema.sql           PostgreSQL schema
├── deploy/                 Nginx and systemd examples
├── scripts/                Sitemap, sample image and OG image generators
└── docs/                   Architecture, deployment, CRM integration and content guide
```

## Important content notes

- **Sample imagery.** Every image in `public/images/samples/` is a generated illustration, labelled "Sample illustration". The site marks portfolio entries as "Sample Concept" and explains that they are not completed projects. Replace them with real photography before launch. See [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md).
- **No invented business facts.** The phone number, email and Instagram link come from environment variables and are hidden when blank. No address, licence, certification or review is included. The testimonials section shows a neutral placeholder until real, permission-granted reviews are added to `src/data/testimonials.ts`.
- **Set `SITE_URL` / `VITE_SITE_URL`** to the real domain before building for production. Canonical URLs, Open Graph tags and the sitemap use it.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Deployment (VPS)](docs/DEPLOYMENT.md)
- [CRM integration](docs/CRM_INTEGRATION.md)
- [Content and imagery guide](docs/CONTENT_GUIDE.md)
