/**
 * Central brand + business configuration.
 * Contact details come from environment variables and are only shown when set —
 * nothing here is invented. See `.env.example`.
 */
const env = import.meta.env;

const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

export const site = {
  name: 'Velluto Interiors',
  shortName: 'Velluto',
  tagline: 'Where Craftsmanship Meets Distinction.',
  statement: 'Exceptional kitchens. Thoughtfully designed interiors. Meticulously executed craftsmanship.',
  description:
    'Velluto Interiors designs and builds luxury kitchens, custom cabinetry and refined interiors for discerning homeowners across South Florida — Boca Raton, Fort Lauderdale, Pompano Beach, Palm Beach and surrounding communities.',
  url: (clean(env.VITE_SITE_URL) ?? 'https://www.example.com').replace(/\/$/, ''),
  region: 'South Florida',
  phone: clean(env.VITE_PUBLIC_PHONE),
  email: clean(env.VITE_PUBLIC_EMAIL),
  instagram: clean(env.VITE_PUBLIC_INSTAGRAM_URL),
  ogImage: '/images/og-default.jpg',
} as const;

export const nav = [
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/service-areas', label: 'Service Areas' },
] as const;
