import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { services } from '../data/services';
import { areas } from '../data/areas';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-onyx-900">
      <div className="container-site grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory-dim">Luxury kitchen remodeling, custom cabinetry and interior renovation for South Florida residences.</p>
          <ul className="mt-6 space-y-2 text-sm text-ivory-muted">
            {site.phone && (
              <li>
                <a className="link-underline" href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}>{site.phone}</a>
              </li>
            )}
            {site.email && (
              <li>
                <a className="link-underline" href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            )}
            {site.instagram && (
              <li>
                <a className="link-underline" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              </li>
            )}
            <li>
              <Link className="link-underline text-gold" to="/contact">Request a consultation →</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-6">Services</h2>
          <ul className="space-y-3 text-sm text-ivory-muted">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link className="link-underline hover:text-ivory" to={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
            <li>
              <Link className="link-underline hover:text-ivory" to="/services">All services</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-6">Service Areas</h2>
          <ul className="space-y-3 text-sm text-ivory-muted">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link className="link-underline hover:text-ivory" to={`/service-areas/${a.slug}`}>{a.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-6">Studio</h2>
          <ul className="space-y-3 text-sm text-ivory-muted">
            <li><Link className="link-underline hover:text-ivory" to="/about">About Velluto</Link></li>
            <li><Link className="link-underline hover:text-ivory" to="/portfolio">Portfolio</Link></li>
            <li><Link className="link-underline hover:text-ivory" to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-site flex flex-col gap-3 py-6 text-[0.7rem] uppercase tracking-[0.2em] text-ivory-dim sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Serving {site.region}</p>
        </div>
      </div>
    </footer>
  );
}
