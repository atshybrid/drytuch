export default function Badge({ children, color = 'primary', className = '' }) {
  const colors = {
    primary: 'bg-luxury-primary/15 text-luxury-primary border-luxury-primary/25',
    secondary: 'bg-luxury-secondary/15 text-luxury-secondary border-luxury-secondary/25',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    muted: 'bg-white/5 text-luxury-muted border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${colors[color]} ${className}`}
    >
      {children}
    </span>
  );
}
