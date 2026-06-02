import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, viewAllLink, accent }) {
  return (
    <div className="mb-4 flex items-end justify-between px-4">
      <div>
        {accent ? (
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            {accent}
          </span>
        ) : null}
        <h2 className="font-display text-xl font-bold tracking-tight text-ink">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
        ) : null}
      </div>
      {viewAllLink ? (
        <Link
          to={viewAllLink}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-surface"
        >
          <ChevronRight size={18} className="text-ink" />
        </Link>
      ) : null}
    </div>
  );
}
