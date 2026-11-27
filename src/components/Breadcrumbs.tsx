import { Link } from 'react-router-dom';

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.65rem] uppercase tracking-[0.22em] text-ivory-dim">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            {i < items.length - 1 ? (
              <>
                <Link to={it.path} className="hover:text-gold">{it.name}</Link>
                <span aria-hidden>/</span>
              </>
            ) : (
              <span aria-current="page" className="text-ivory-muted">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
