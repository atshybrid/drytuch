import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartCount } from '../../store/slices/cartSlice';
import BrandLogo from './BrandLogo';

export default function Header({ title, showBack = false }) {
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 safe-top px-4 pt-2 md:hidden"
    >
      <div className="glass-luxury flex h-12 items-center gap-2 rounded-xl px-2">
        {showBack ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-700"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
        ) : null}

        {title ? (
          <h1 className="flex-1 truncate font-display text-base font-bold">{title}</h1>
        ) : (
          <div className="flex-1">
            <BrandLogo size="sm" linkTo="/" />
          </div>
        )}

        <Link
          to="/cart"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-luxury-primary"
          aria-label="Cart"
        >
          <ShoppingBag size={16} />
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-luxury-secondary text-[9px] font-black text-black">
              {cartCount}
            </span>
          ) : null}
        </Link>
      </div>
    </motion.header>
  );
}
