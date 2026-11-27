import type { ReactNode } from 'react';

export function PageHero({ eyebrow, title, intro, image, imageAlt, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; image?: string; imageAlt?: string; children?: ReactNode }) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden pb-16 pt-40 sm:pb-24">
      {image && (
        <>
          <img src={image} alt={imageAlt ?? ''} className="hero-zoom absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/75 to-onyx/40" />
        </>
      )}
      <div className="container-site relative">
        {children}
        <p className="eyebrow mt-8">{eyebrow}</p>
        <div className="rule my-6" />
        <h1 className="max-w-4xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory-muted sm:text-lg">{intro}</p>}
      </div>
    </section>
  );
}
