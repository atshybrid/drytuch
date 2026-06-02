import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Search, ShoppingBag, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../store/slices/cartSlice';

const tabs = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/categories', label: 'Categories', icon: LayoutGrid },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/cart', label: 'Cart', icon: ShoppingBag },
  { to: '/profile', label: 'Account', icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const cartCount = useSelector(selectCartCount);
  if (['/splash', '/checkout'].some((p) => location.pathname.startsWith(p))) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-border bg-white safe-bottom md:hidden">
      <div className="flex h-[var(--nav-h)] items-stretch">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5"
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <motion.div layoutId="tab-pill" className="absolute inset-x-2 inset-y-1.5 rounded-xl bg-stone-100" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                ) : null}
                <span className="relative z-10">
                  <Icon size={22} className={isActive ? 'text-brand-primary' : 'text-stone-400'} strokeWidth={isActive ? 2.5 : 2} />
                  {to === '/cart' && cartCount > 0 ? (
                    <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary text-[8px] font-bold text-white">
                      {cartCount}
                    </span>
                  ) : null}
                </span>
                <span className={`relative z-10 text-[10px] font-semibold ${isActive ? 'text-brand-primary' : 'text-stone-400'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
