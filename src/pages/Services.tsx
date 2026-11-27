import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { ConsultationCta } from '../components/ConsultationCta';
import { services } from '../data/services';
import { breadcrumbSchema } from '../lib/schema';

export default function Services() {
  return (
    <>
      <Seo
        title="Kitchen Remodeling & Custom Cabinetry Services"
        description="Luxury kitchen remodeling, custom kitchen cabinetry, design and space planning, cabinet installation, countertops, lighting, bathrooms, closets and complete interior renovations in South Florida."
        path="/services"
        jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])}
      />
      <PageHero eyebrow="Services" title={<>Every detail, <em className="text-champagne">one studio.</em></>} intro="Nine disciplines, one standard. Commission a complete kitchen remodel or engage us for a single, perfectly executed element." image="/images/samples/kitchen-walnut.svg" imageAlt="Sample illustration of a walnut kitchen" />
      <section className="py-24 sm:py-32">
        <div className="container-site space-y-28 sm:space-y-36">
          {services.map((s, i) => (
            <article key={s.slug} id={s.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
                <Link to={`/services/${s.slug}`} className="group block overflow-hidden">
                  <img src={s.image} alt={s.imageAlt} loading="lazy" width={1600} height={1000} className="aspect-[16/10] w-full object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-105" />
                </Link>
              </Reveal>
              <Reveal className="lg:col-span-5" delay={120}>
                <span className="font-serif text-gold">{s.number}</span>
                <h2 className="mt-4 text-4xl sm:text-5xl">{s.title}</h2>
                <p className="mt-6 leading-relaxed text-ivory-muted">{s.description}</p>
                <ul className="mt-8 space-y-3 border-t border-ivory/10 pt-6 text-sm text-ivory-dim">
                  {s.includes.slice(0, 4).map((x) => (
                    <li key={x} className="flex gap-3"><span className="text-gold">—</span>{x}</li>
                  ))}
                </ul>
                <Link to={`/services/${s.slug}`} className="btn-outline mt-10">Learn more</Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}
