import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import { selectCartCount } from '../../../store/slices/cartSlice';
import { useMagnetic } from '../../../hooks/useMagnetic';

export default function MagneticButton({
  children,
  to,
  onClick,
  className = '',
  variant = 'primary',
}) {
  const { ref, onMove, onLeave } = useMagnetic(0.25);
  const base =
    variant === 'primary'
      ? 'btn-cinematic'
      : 'btn-cinematic-outline';

  const inner = (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex transition-transform duration-200 ${base} ${className}`}
    >
      {children}
    </span>
  );

  if (to) return <Link to={to}>{inner}</Link>;
  return (
    <button type="button" onClick={onClick} className="border-0 bg-transparent p-0">
      {inner}
    </button>
  );
}

export function CinematicNav() {
  const cartCount = useSelector(selectCartCount);

  return (
    <nav className="cinematic-nav safe-top">
      <div className="cinematic-nav-inner">
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight text-stone-900">
          <span className="text-luxury-primary">DRY</span>TUCH
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {['Shop', 'Process', 'Stories', 'Collection'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 transition hover:text-stone-900"
            >
              {item}
            </a>
          ))}
        </div>
        <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full glass-cinematic">
          <ShoppingBag size={16} />
          {cartCount > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-luxury-secondary text-[9px] font-black text-black">
              {cartCount}
            </span>
          ) : null}
        </Link>
      </div>
    </nav>
  );
}
