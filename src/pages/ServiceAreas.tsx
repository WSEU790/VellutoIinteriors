import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { ConsultationCta } from '../components/ConsultationCta';
import { areas } from '../data/areas';
import { breadcrumbSchema } from '../lib/schema';

export default function ServiceAreas() {
  return (
    <>
      <Seo title="Service Areas — Luxury Kitchen Remodeling South Florida" description="Velluto Interiors serves Boca Raton, Fort Lauderdale, Pompano Beach, Palm Beach, Delray Beach, West Palm Beach and surrounding South Florida communities." path="/service-areas" jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/service-areas' }])} />
      <PageHero eyebrow="Service Areas" title={<>Luxury kitchen remodeling across <em className="text-champagne">South Florida.</em></>} intro="We work with homeowners in Palm Beach and Broward counties, from oceanfront condominiums to private estates." image="/images/samples/interior-ivory.svg" imageAlt="Sample illustration of a bright South Florida living space" />
      <section className="py-24 sm:py-32">
        <div className="container-site grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 100} className="bg-onyx">
              <Link to={`/service-areas/${a.slug}`} className="group flex h-full flex-col p-10 transition-colors duration-700 hover:bg-onyx-800">
                <p className="eyebrow !text-[0.6rem]">{a.county}</p>
                <h2 className="mt-4 text-3xl group-hover:text-champagne">{a.name}</h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory-dim">{a.intro}</p>
                <span className="mt-8 text-[0.65rem] uppercase tracking-[0.26em] text-gold">{a.keyword} →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}
