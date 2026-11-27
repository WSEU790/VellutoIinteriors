import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ConsultationCta } from '../components/ConsultationCta';
import { areas } from '../data/areas';
import { services } from '../data/services';
import { breadcrumbSchema, businessSchema } from '../lib/schema';
import NotFound from './NotFound';

export default function AreaDetail() {
  const { slug } = useParams();
  const a = areas.find((x) => x.slug === slug);
  if (!a) return <NotFound />;
  const path = `/service-areas/${a.slug}`;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/service-areas' }, { name: a.name, path }];
  return (
    <>
      <Seo title={`${a.keyword} | Luxury Kitchens`} description={`${a.intro} Request a private design consultation.`} path={path} jsonLd={[breadcrumbSchema(crumbs), businessSchema()]} />
      <PageHero eyebrow={`${a.name}, Florida`} title={a.headline} intro={a.intro} image="/images/samples/kitchen-ivory.svg" imageAlt={`Sample illustration of a luxury kitchen design for ${a.name} homes`}>
        <Breadcrumbs items={crumbs} />
      </PageHero>
      <section className="py-24 sm:py-32">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="space-y-6 text-lg leading-relaxed text-ivory-muted lg:col-span-6">
            <h2 className="text-3xl text-ivory sm:text-4xl">Designed for {a.name} living</h2>
            <p>{a.focus}</p>
            <p>Every engagement begins with a private consultation at your home, where we discuss how you use the space, review the existing conditions and talk candidly about scope, timeline and investment.</p>
            <Link to="/contact" className="btn-gold mt-4">Request a Consultation</Link>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={120}>
            <p className="eyebrow">Services in {a.name}</p>
            <ul className="mt-6 divide-y divide-ivory/10 border-y border-ivory/10">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="flex items-center justify-between py-4 text-ivory-muted transition-colors hover:text-gold">
                    <span>{s.title}</span>
                    <span aria-hidden className="text-gold">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <section className="border-t border-ivory/10 py-16">
        <div className="container-site flex flex-wrap items-center gap-3">
          <span className="eyebrow mr-4">Also serving</span>
          {areas.filter((x) => x.slug !== a.slug).map((x) => (
            <Link key={x.slug} to={`/service-areas/${x.slug}`} className="border border-ivory/15 px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-ivory-muted hover:border-gold hover:text-gold">{x.name}</Link>
          ))}
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}
