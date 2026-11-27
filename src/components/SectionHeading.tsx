import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function SectionHeading({ eyebrow, title, intro, align = 'left', as = 'h2' }: { eyebrow: string; title: ReactNode; intro?: ReactNode; align?: 'left' | 'center'; as?: 'h1' | 'h2' }) {
  const H = as;
  const center = align === 'center';
  return (
    <Reveal className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <div className={`rule my-6 ${center ? 'mx-auto' : ''}`} />
      <H className={as === 'h1' ? 'text-5xl leading-[1.05] sm:text-6xl lg:text-7xl' : 'text-4xl leading-[1.1] sm:text-5xl'}>{title}</H>
      {intro && <p className="mt-6 text-base leading-relaxed text-ivory-muted sm:text-lg">{intro}</p>}
    </Reveal>
  );
}
