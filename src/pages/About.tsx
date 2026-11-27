import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { ConsultationCta } from '../components/ConsultationCta';
import { breadcrumbSchema } from '../lib/schema';

const values = [
  ['Discretion', 'We work in private homes and treat every residence, schedule and conversation with complete discretion.'],
  ['Integrity', 'Clear proposals, honest recommendations and transparent communication from consultation to handover.'],
  ['Restraint', 'Luxury is not excess. We edit relentlessly until only what is essential — and beautiful — remains.'],
  ['Permanence', 'We design for decades, choosing materials and details that improve with age rather than date.'],
];

const standards = [
  ['Measured twice', 'Every project begins with a precise site survey so that cabinetry fits the room as it truly is — not as the drawings assume.'],
  ['Protected homes', 'Floors, finishes and furnishings are protected throughout the work, and sites are left orderly at the end of every day.'],
  ['Consistent reveals', 'Door gaps, panel lines and filler widths are held consistent across the entire kitchen.'],
  ['Final adjustment', 'Before handover, every door, drawer and hinge is adjusted, every surface inspected and every detail signed off.'],
];

export default function About() {
  return (
    <>
      <Seo title="About Velluto Interiors — Design Philosophy & Craftsmanship" description="Velluto Interiors is a South Florida studio for luxury kitchens, custom cabinetry and refined interiors, guided by European design sensibility and exacting craftsmanship." path="/about" jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <PageHero eyebrow="About Velluto" title={<>Velvet-quiet <em className="text-champagne">luxury.</em></>} intro="Velluto — Italian for velvet — names the quality we pursue in every room: richness you feel rather than see, and a calm that comes from things done properly." image="/images/samples/kitchen-sage.svg" imageAlt="Sample illustration of a sage green kitchen" />

      <section className="py-28 sm:py-36">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Our Story" title="A studio devoted to the heart of the home." />
          </div>
          <Reveal className="space-y-6 text-lg leading-relaxed text-ivory-muted lg:col-span-6 lg:col-start-7 lg:pt-16" delay={120}>
            <p>Velluto Interiors was founded on a simple conviction: the kitchen deserves the same design rigour as the finest architecture in a home. It is where mornings begin, where guests gather and where the quality of craftsmanship is felt every single day.</p>
            <p>Serving homeowners across South Florida, we bring a European-inspired sensibility to kitchens, bathrooms, closets and complete interiors — balancing timeless proportions with the realities of coastal living.</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ivory/10 bg-onyx-800 py-28 sm:py-36">
        <div className="container-site grid gap-16 lg:grid-cols-2">
          <Reveal>
            <img src="/images/samples/space-plan.svg" alt="Sample kitchen space plan drawing" loading="lazy" className="aspect-[16/10] w-full object-cover" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Design Philosophy" title={<>Proportion first. <em className="text-champagne">Ornament last.</em></>} />
            <Reveal className="mt-8 space-y-5 leading-relaxed text-ivory-muted" delay={120}>
              <p>We begin with how a room is used and how it is seen — sightlines from the living room, the reach between sink and range, the way afternoon light falls across a countertop.</p>
              <p>Only when the architecture is resolved do we layer material, colour and hardware. The result is design that feels inevitable: calm, cohesive and entirely your own.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <div className="container-site">
          <SectionHeading eyebrow="Craftsmanship Standards" title="Installation expertise, held to a higher standard." intro="Cabinetry is only as good as its installation. These are the commitments our installers work to on every project." />
          <div className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-2">
            {standards.map(([t, d], i) => (
              <Reveal key={t} className="bg-onyx p-10" delay={(i % 2) * 100}>
                <h3 className="text-2xl text-champagne">{t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory-dim">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ivory/10 py-28 sm:py-36">
        <div className="container-site">
          <SectionHeading eyebrow="Values" title="What we stand for." align="center" />
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={i * 100} className="text-center">
                <p className="font-serif text-4xl text-gold/50">0{i + 1}</p>
                <h3 className="mt-4 text-2xl">{t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory-dim">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}
