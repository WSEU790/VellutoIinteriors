import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { ConsultationCta } from '../components/ConsultationCta';
import { SampleNotice } from '../components/SampleNotice';
import { site } from '../data/site';
import { services } from '../data/services';
import { projects } from '../data/projects';
import { testimonials } from '../data/testimonials';
import { areas } from '../data/areas';
import { businessSchema } from '../lib/schema';

const pillars = [
  { title: 'Bespoke by Design', text: 'Every kitchen begins with a blank page and a careful study of how you live. Nothing is templated; everything is drawn for your home.' },
  { title: 'Material Integrity', text: 'Natural stone, solid timbers, fine veneers and hardware selected for how they feel in the hand and how they age over decades.' },
  { title: 'Precision Installation', text: 'Consistent reveals, true doors and invisible transitions. Installation is where craftsmanship is proven, and we hold it to the highest standard.' },
  { title: 'One Accountable Studio', text: 'Design, cabinetry, surfaces and finishing coordinated by a single team — one vision, one point of contact, one standard.' },
];

const process = [
  { n: 'I', t: 'Consultation', d: 'A private conversation about your home, your priorities and your investment.' },
  { n: 'II', t: 'Design', d: 'Measured plans, elevations and material selections refined together.' },
  { n: 'III', t: 'Craft', d: 'Cabinetry and surfaces specified, produced and prepared to exacting tolerances.' },
  { n: 'IV', t: 'Installation', d: 'Careful, orderly execution on site — finished, detailed and handed over.' },
];

export default function Home() {
  const featured = projects.filter((p) => p.category === 'Kitchens' || p.category === 'Cabinetry').slice(0, 3);
  return (
    <>
      <Seo
        title="Velluto Interiors | Luxury Kitchen Remodeling South Florida"
        description="Luxury kitchen remodeling, custom cabinetry and interior renovation in Boca Raton, Fort Lauderdale, Pompano Beach and Palm Beach. Request a private design consultation."
        path="/"
        jsonLd={businessSchema()}
      />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img src="/images/samples/hero-kitchen.svg" alt="Sample illustration of a dark luxury kitchen with brass pendant lights over a stone island" className="hero-zoom absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/55 to-onyx/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx/80 via-onyx/20 to-transparent" />
        <div className="container-site relative pb-20 pt-40 sm:pb-28">
          <Reveal>
            <p className="eyebrow">Luxury Kitchens · Custom Cabinetry · {site.region}</p>
            <div className="rule my-7" />
            <h1 className="max-w-4xl text-[2.9rem] leading-[1.02] sm:text-7xl lg:text-[5.6rem]">
              Where Craftsmanship <em className="font-light text-champagne">Meets</em> Distinction.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory-muted sm:text-lg">{site.statement}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="btn-gold">Request a Consultation</Link>
              <Link to="/portfolio" className="btn-outline">Explore the Portfolio</Link>
            </div>
          </Reveal>
        </div>
        <div aria-hidden className="absolute bottom-8 right-8 hidden items-center gap-4 text-[0.6rem] uppercase tracking-[0.3em] text-ivory-dim lg:flex">
          <span className="h-12 w-px bg-gold/60" /> Scroll
        </div>
      </section>

      {/* POSITIONING */}
      <section className="py-28 sm:py-40">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="The Studio" title={<>Kitchens composed with an <em className="text-champagne">architect’s eye</em> and a cabinetmaker’s hand.</>} />
          </div>
          <Reveal className="space-y-6 text-lg leading-relaxed text-ivory-muted lg:col-span-6 lg:col-start-7 lg:pt-16" delay={150}>
            <p>Velluto Interiors is a South Florida studio dedicated to the kitchen — the room where architecture, craftsmanship and daily life meet most intimately.</p>
            <p>Drawing on European design sensibilities, we create kitchens and interiors of quiet confidence: considered proportions, honest materials and details resolved with precision. The result is a home that feels effortless, because every decision was made with care.</p>
            <Link to="/about" className="link-underline inline-block pt-4 text-[0.72rem] uppercase tracking-[0.26em] text-gold">Our philosophy</Link>
          </Reveal>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="border-t border-ivory/10 bg-onyx-800 py-28 sm:py-36">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Featured Kitchens" title="Design concepts" intro="A selection of kitchen design studies illustrating our approach to proportion, material and light." />
            <Reveal>
              <Link to="/portfolio" className="btn-outline">View all work</Link>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120} className={i === 1 ? 'md:mt-16' : ''}>
                <ProjectCard project={p} tall />
              </Reveal>
            ))}
          </div>
          <SampleNotice className="mt-14 max-w-2xl" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 sm:py-36">
        <div className="container-site">
          <SectionHeading eyebrow="Services" title="A complete studio for the kitchen and beyond." intro="From the first measured drawing to the last adjusted hinge, every aspect of your project is handled in-house or by trades we coordinate directly." />
          <ul className="mt-16 grid border-t border-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 100} className="border-b border-ivory/10 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r">
                <Link to={`/services/${s.slug}`} className="group flex h-full flex-col p-8 transition-colors duration-700 hover:bg-onyx-800 sm:p-10">
                  <span className="font-serif text-sm text-gold">{s.number}</span>
                  <h3 className="mt-6 text-2xl transition-colors group-hover:text-champagne">{s.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory-dim">{s.summary}</p>
                  <span className="mt-8 text-[0.65rem] uppercase tracking-[0.26em] text-gold opacity-70 transition-opacity group-hover:opacity-100">Discover →</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section className="relative overflow-hidden border-y border-ivory/10 bg-onyx-900">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[420px]">
            <img src="/images/samples/craft-detail.svg" alt="Sample illustration of walnut cabinet door profiles with brass pulls" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="px-5 py-24 sm:px-12 lg:px-20 lg:py-32">
            <SectionHeading eyebrow="Craftsmanship" title={<>The difference lives in the <em className="text-champagne">details.</em></>} />
            <Reveal className="mt-10 space-y-8" delay={120}>
              {[
                ['Proportion', 'Door widths, reveals and rail heights calibrated to the architecture of each room.'],
                ['Joinery', 'Cabinet construction specified for longevity in a coastal climate.'],
                ['Finish', 'Hand-inspected surfaces, consistent sheen and colour, edges eased with care.'],
                ['Alignment', 'Every line level, every gap consistent — checked, then checked again.'],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-6 border-t border-ivory/10 pt-6">
                  <h3 className="w-32 shrink-0 font-serif text-xl text-gold">{t}</h3>
                  <p className="text-sm leading-relaxed text-ivory-muted">{d}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY VELLUTO */}
      <section className="py-28 sm:py-36">
        <div className="container-site">
          <SectionHeading eyebrow="Why Velluto" title="An exclusive standard, held throughout." align="center" />
          <div className="mt-20 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} className="bg-onyx p-10">
                <span className="font-serif text-5xl text-gold/40">0{i + 1}</span>
                <h3 className="mt-6 text-2xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory-dim">{p.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-24 grid gap-10 md:grid-cols-4">
            {process.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <p className="font-serif text-3xl text-gold">{s.n}</p>
                <div className="my-5 h-px bg-ivory/15" />
                <h3 className="text-xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-ivory/10 bg-onyx-800 py-28 sm:py-36" aria-labelledby="testimonials-heading">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Client Words</p>
            <div className="rule mx-auto my-6" />
            <h2 id="testimonials-heading" className="text-4xl sm:text-5xl">In their own words</h2>
          </Reveal>
          {testimonials.length > 0 ? (
            <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <Reveal as="figure" key={t.name + t.quote.slice(0, 12)} className="border border-ivory/10 p-10">
                  <blockquote className="font-serif text-xl italic leading-relaxed text-ivory">“{t.quote}”</blockquote>
                  <figcaption className="mt-8 text-[0.68rem] uppercase tracking-[0.24em] text-gold">
                    {t.name}
                    {t.location && <span className="text-ivory-dim"> · {t.location}</span>}
                  </figcaption>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mx-auto mt-14 max-w-2xl text-center">
              <p className="font-serif text-2xl italic leading-relaxed text-ivory-muted">Verified client testimonials will be shared here as projects are completed and clients grant permission to publish their words.</p>
              <Link to="/contact" className="link-underline mt-10 inline-block text-[0.72rem] uppercase tracking-[0.26em] text-gold">Discuss your project with us</Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* AREAS */}
      <section className="py-24">
        <div className="container-site flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <p className="eyebrow">Serving South Florida</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Boca Raton to the Palm Beaches.</h2>
          </Reveal>
          <Reveal as="ul" className="flex flex-wrap gap-3" delay={100}>
            {areas.map((a) => (
              <li key={a.slug}>
                <Link to={`/service-areas/${a.slug}`} className="inline-block border border-ivory/15 px-5 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-ivory-muted transition-colors duration-500 hover:border-gold hover:text-gold">
                  {a.name}
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
