import { useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { ProjectCard } from '../components/ProjectCard';
import { SampleNotice } from '../components/SampleNotice';
import { ConsultationCta } from '../components/ConsultationCta';
import { breadcrumbSchema } from '../lib/schema';
import { categories, projects, type ProjectCategory } from '../data/projects';

export default function Portfolio() {
  const [params, setParams] = useSearchParams();
  const active = (params.get('category') as ProjectCategory | null) ?? null;
  const valid = active && categories.includes(active) ? active : null;
  const list = valid ? projects.filter((p) => p.category === valid) : projects;
  const filters: (ProjectCategory | null)[] = [null, ...categories];

  return (
    <>
      <Seo title="Portfolio — Luxury Kitchens & Interiors" description="Explore luxury kitchen, custom cabinetry, bathroom, closet and interior design concepts from Velluto Interiors, South Florida." path="/portfolio" jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }])} />
      <PageHero eyebrow="Portfolio" title={<>A study in <em className="text-champagne">considered design.</em></>} intro="Browse kitchens, cabinetry, bathrooms, closets and complete interiors." image="/images/samples/kitchen-ivory.svg" imageAlt="Sample illustration of an ivory kitchen" />
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SampleNotice className="mb-12 max-w-2xl border-l border-gold/60 pl-5" />
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2 border-b border-ivory/10 pb-8">
            {filters.map((c) => {
              const isActive = c === valid;
              return (
                <button
                  key={c ?? 'all'}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setParams(c ? { category: c } : {}, { replace: true })}
                  className={`px-5 py-3 text-[0.68rem] uppercase tracking-[0.24em] transition-colors duration-500 ${isActive ? 'bg-gold text-onyx' : 'border border-ivory/15 text-ivory-muted hover:border-gold hover:text-gold'}`}
                >
                  {c ?? 'All'}
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-ivory-dim" aria-live="polite">
            {list.length} {list.length === 1 ? 'project' : 'projects'}
          </p>
          <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 100}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}
