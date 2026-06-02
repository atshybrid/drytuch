import { NavLink, Link } from 'react-router-dom';
import { Search, ShoppingBag, LayoutGrid } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../store/slices/cartSlice';
import BrandLogo from './BrandLogo';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/categories', label: 'Shop' },
  { to: '/search', label: 'Search' },
  { to: '/offers', label: 'Offers' },
  { to: '/orders', label: 'Orders' },
  { to: '/profile', label: 'Account' },
];

export default function DesktopNav() {
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="sticky top-0 z-50 hidden border-b border-stone-200 bg-white/90 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        <BrandLogo size="md" linkTo="/" />

        <nav className="flex items-center gap-1">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-luxury-primary/15 text-luxury-primary'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/search"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-600 transition hover:bg-stone-200"
            aria-label="Search"
          >
            <Search size={18} />
          </Link>
          <Link
            to="/cart"
            className="relative flex h-10 items-center gap-2 rounded-xl bg-luxury-primary px-4 text-sm font-bold text-white"
          >
            <ShoppingBag size={16} />
            Cart
            {cartCount > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-luxury-secondary px-1 text-[10px] font-black text-black">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function HomeTopBar() {
  const cartCount = useSelector(selectCartCount);

  return (
    <div className="absolute left-0 right-0 top-0 z-20 safe-top px-4 pt-3 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <BrandLogo size="sm" linkTo="/" />
        <Link
          to="/search"
          className="glass-luxury flex flex-1 items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-white/50 transition hover:text-white/70"
        >
          <Search size={16} />
          <span>Search dry meat, fruits...</span>
        </Link>
        <Link
          to="/cart"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-luxury"
          aria-label="Cart"
        >
          <ShoppingBag size={18} />
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-luxury-secondary text-[9px] font-black text-black">
              {cartCount}
            </span>
          ) : null}
        </Link>
        <Link
          to="/categories"
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-luxury md:flex"
          aria-label="Categories"
        >
          <LayoutGrid size={18} />
        </Link>
      </div>
    </div>
  );
}
