/**
 * Generates public/sitemap.xml and public/robots.txt from the route data.
 * Runs automatically during `npm run build`. Uses SITE_URL (or VITE_SITE_URL).
 */
import 'dotenv/config';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { services } from '../src/data/services';
import { projects } from '../src/data/projects';
import { areas } from '../src/data/areas';

const base = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://www.example.com').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const routes: { path: string; priority: string; freq: string }[] = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/services', priority: '0.9', freq: 'monthly' },
  { path: '/portfolio', priority: '0.8', freq: 'weekly' },
  { path: '/about', priority: '0.6', freq: 'yearly' },
  { path: '/service-areas', priority: '0.8', freq: 'monthly' },
  { path: '/contact', priority: '0.9', freq: 'yearly' },
  ...services.map((s) => ({ path: `/services/${s.slug}`, priority: '0.8', freq: 'monthly' })),
  ...areas.map((a) => ({ path: `/service-areas/${a.slug}`, priority: '0.8', freq: 'monthly' })),
  ...projects.map((p) => ({ path: `/portfolio/${p.slug}`, priority: '0.6', freq: 'monthly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${base}${r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.freq}</changefreq><priority>${r.priority}</priority></url>`).join('\n')}
</urlset>
`;
const pub = join(process.cwd(), 'public');
writeFileSync(join(pub, 'sitemap.xml'), xml);
writeFileSync(join(pub, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${base}/sitemap.xml\n`);
console.log(`sitemap.xml: ${routes.length} URLs for ${base}`);
