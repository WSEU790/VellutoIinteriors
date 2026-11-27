import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';

export function ProjectCard({ project, tall = false }: { project: Project; tall?: boolean }) {
  return (
    <Link to={`/portfolio/${project.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-onyx-700 ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        <img src={project.cover} alt={project.coverAlt} loading="lazy" decoding="async" width={1600} height={1000} className="h-full w-full object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
        {project.isSample && <span className="sample-badge absolute left-4 top-4">Sample Concept</span>}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow !text-[0.62rem]">{project.category} · {project.style}</p>
          <h3 className="mt-2 text-2xl transition-colors duration-500 group-hover:text-gold">{project.title}</h3>
        </div>
        <span aria-hidden className="text-gold transition-transform duration-500 group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
