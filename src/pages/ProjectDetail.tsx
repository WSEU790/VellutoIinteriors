import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/Reveal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BeforeAfter } from '../components/BeforeAfter';
import { SampleNotice } from '../components/SampleNotice';
import { ProjectCard } from '../components/ProjectCard';
import { ConsultationCta } from '../components/ConsultationCta';
import { projects } from '../data/projects';
import { breadcrumbSchema } from '../lib/schema';
import NotFound from './NotFound';

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const path = `/portfolio/${p.slug}`;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }, { name: p.title, path }];
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const related = projects.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 2);

  return (
    <>
      <Seo title={`${p.title} — ${p.category}`} description={p.summary} path={path} type="article" jsonLd={breadcrumbSchema(crumbs)} />
      <section className="relative flex min-h-[80vh] items-end overflow-hidden pb-16 pt-40">
        <img src={p.cover} alt={p.coverAlt} className="hero-zoom absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/50 to-onyx/30" />
        <div className="container-site relative">
          <Breadcrumbs items={crumbs} />
          {p.isSample && <span className="sample-badge mt-8">Sample Design Concept</span>}
          <p className="eyebrow mt-6">{p.category} · {p.style}</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] sm:text-7xl">{p.title}</h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="space-y-6 text-lg leading-relaxed text-ivory-muted lg:col-span-7">
            <p className="font-serif text-2xl leading-snug text-ivory">{p.summary}</p>
            {p.description.map((d) => (
              <p key={d.slice(0, 20)}>{d}</p>
            ))}
            {p.isSample && <SampleNotice />}
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <dl className="space-y-8 border-t border-ivory/10 pt-8">
              <div>
                <dt className="eyebrow">Scope</dt>
                <dd className="mt-3 space-y-1 text-sm text-ivory-muted">{p.scope.map((s) => <p key={s}>{s}</p>)}</dd>
              </div>
              <div>
                <dt className="eyebrow">Materials</dt>
                <dd className="mt-3 space-y-1 text-sm text-ivory-muted">{p.materials.map((s) => <p key={s}>{s}</p>)}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {p.beforeAfter && (
        <section className="border-t border-ivory/10 bg-onyx-800 py-24">
          <div className="container-site">
            <Reveal>
              <p className="eyebrow">Before & After</p>
              <h2 className="mt-4 text-4xl">The transformation</h2>
              <p className="mt-4 max-w-xl text-sm text-ivory-dim">Drag the handle, or use the slider, to compare. Illustrations shown are samples.</p>
            </Reveal>
            <Reveal className="mt-12" delay={100}>
              <BeforeAfter {...p.beforeAfter} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-24">
        <div className="container-site">
          <p className="eyebrow">Gallery</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {p.gallery.map((g, i) => (
              <Reveal key={g.src + i} className={i === 0 && p.gallery.length % 2 === 1 ? 'md:col-span-2' : ''} delay={(i % 2) * 100}>
                <figure>
                  <img src={g.src} alt={g.alt} loading="lazy" width={1600} height={1000} className="aspect-[16/10] w-full object-cover" />
                  <figcaption className="mt-3 text-xs text-ivory-dim">{g.alt}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ivory/10 py-24">
          <div className="container-site">
            <p className="eyebrow">Related</p>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {related.map((r) => <ProjectCard key={r.slug} project={r} />)}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-ivory/10">
        <Link to={`/portfolio/${next.slug}`} className="group container-site flex items-center justify-between py-14">
          <span>
            <span className="eyebrow">Next project</span>
            <span className="mt-3 block font-serif text-3xl transition-colors group-hover:text-gold sm:text-5xl">{next.title}</span>
          </span>
          <span aria-hidden className="text-3xl text-gold transition-transform duration-500 group-hover:translate-x-2">→</span>
        </Link>
      </section>
      <ConsultationCta />
    </>
  );
}
