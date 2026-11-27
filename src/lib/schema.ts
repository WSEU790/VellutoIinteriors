import { site } from '../data/site';
import { areas } from '../data/areas';
import { services } from '../data/services';

/** schema.org structured data. Only includes details that are actually configured. */
export function businessSchema() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}${site.ogImage}`,
    slogan: site.tagline,
    areaServed: [{ '@type': 'AdministrativeArea', name: 'South Florida' }, ...areas.map((a) => ({ '@type': 'City', name: `${a.name}, FL` }))],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Kitchen remodeling and interior renovation services',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, url: `${site.url}/services/${s.slug}` } })),
    },
  };
  if (site.phone) data.telephone = site.phone;
  if (site.email) data.email = site.email;
  if (site.instagram) data.sameAs = [site.instagram];
  return data;
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${site.url}${path}`,
    provider: { '@id': `${site.url}/#business` },
    areaServed: 'South Florida',
  };
}
