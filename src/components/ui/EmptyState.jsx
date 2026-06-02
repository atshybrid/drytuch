import { PackageOpen } from 'lucide-react';

export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-20 text-center">
      {typeof icon === 'string' ? (
        <span className="text-5xl">{icon}</span>
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-luxury-card text-luxury-muted">
          {icon || <PackageOpen size={28} />}
        </div>
      )}
      <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-xs text-sm text-luxury-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
