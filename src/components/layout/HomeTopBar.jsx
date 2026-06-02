import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MapPin, Bell, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { selectCartCount } from '../../store/slices/cartSlice';

export default function HomeTopBar() {
  const cartCount = useSelector(selectCartCount);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 safe-top px-4 pt-3"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
            <MapPin size={12} className="text-primary" />
            Deliver to
          </div>
          <button type="button" className="flex items-center gap-1 font-display text-sm font-bold text-ink">
            New Delhi
            <span className="text-muted">▾</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/notifications"
            className="flex h-10 w-10 items-center justify-center rounded-2xl glass-ultra"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={2} />
          </Link>
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl btn-primary"
            aria-label="Cart"
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent text-[10px] font-black text-ink">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
