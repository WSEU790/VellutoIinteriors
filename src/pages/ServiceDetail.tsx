import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ConsultationCta } from '../components/ConsultationCta';
import { services } from '../data/services';
import { areas } from '../data/areas';
import { breadcrumbSchema, serviceSchema } from '../lib/schema';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = services.find((x) => x.slug === slug);
  if (!s) return <NotFound />;
  const path = `/services/${s.slug}`;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: s.title, path }];
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <>
      <Seo title={`${s.title} in South Florida`} description={`${s.summary} ${s.title} for homes in Boca Raton, Fort Lauderdale, Pompano Beach and Palm Beach by Velluto Interiors.`} path={path} jsonLd={[serviceSchema(s.title, s.description, path), breadcrumbSchema(crumbs)]} />
      <PageHero eyebrow={`Service ${s.number}`} title={s.title} intro={s.summary} image={s.image} imageAlt={s.imageAlt}>
        <Breadcrumbs items={crumbs} />
      </PageHero>
      <section className="py-24 sm:py-32">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl">Our approach</h2>
            <p className="mt-6 text-lg leading-relaxed text-ivory-muted">{s.description}</p>
            <p className="mt-6 leading-relaxed text-ivory-dim">
              We offer {s.title.toLowerCase()} throughout South Florida, including{' '}
              {areas.map((a, i) => (
                <span key={a.slug}>
                  <Link to={`/service-areas/${a.slug}`} className="link-underline text-ivory-muted">{a.name}</Link>
                  {i < areas.length - 2 ? ', ' : i === areas.length - 2 ? ' and ' : '.'}
                </span>
              ))}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <div className="border border-ivory/10 p-8">
              <p className="eyebrow">What’s included</p>
              <ul className="mt-6 space-y-4 text-sm text-ivory-muted">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-3 border-b border-ivory/10 pb-4 last:border-0"><span className="text-gold">—</span>{x}</li>
                ))}
              </ul>
              <Link to={`/contact?service=${encodeURIComponent(s.title)}`} className="btn-gold mt-8 w-full">Request Consultation</Link>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="border-t border-ivory/10 py-24">
        <div className="container-site">
          <p className="eyebrow">Related services</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/services/${o.slug}`} className="group block border border-ivory/10 p-8 transition-colors duration-500 hover:border-gold/60">
                  <span className="font-serif text-gold">{o.number}</span>
                  <h3 className="mt-4 text-2xl group-hover:text-champagne">{o.title}</h3>
                  <p className="mt-3 text-sm text-ivory-dim">{o.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}
