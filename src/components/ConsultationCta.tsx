import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

export function ConsultationCta({ title = 'Begin your commission.', text = 'Share your vision and we will arrange a private design consultation to discuss scope, materials, timeline and investment.' }: { title?: string; text?: string }) {
  return (
    <section className="relative overflow-hidden border-t border-ivory/10 bg-onyx-800 py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #b89a64 0 1px, transparent 1px 120px)' }} />
      <Reveal className="container-site relative text-center">
        <p className="eyebrow">Private Consultation</p>
        <div className="rule mx-auto my-6" />
        <h2 className="mx-auto max-w-3xl text-4xl leading-tight sm:text-6xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-ivory-muted">{text}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/contact" className="btn-gold">Request a Consultation</Link>
          <Link to="/portfolio" className="btn-outline">View Portfolio</Link>
        </div>
      </Reveal>
    </section>
  );
}
