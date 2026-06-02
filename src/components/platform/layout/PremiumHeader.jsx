import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, ShoppingBag, Heart, User, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../../api';
import { selectCartCount } from '../../../store/slices/cartSlice';
import BrandLogo from '../../layout/BrandLogo';
import { CATEGORY_COLORS } from '../../../constants/brand';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
];

export default function PremiumHeader() {
  const [shopOpen, setShopOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  return (
    <header className="sticky top-0 z-50 hidden border-b border-brand-border bg-white/95 backdrop-blur-md md:block">
      <div className="container-brand flex h-16 items-center gap-6">
        <BrandLogo size="md" linkTo="/" />

        <nav className="flex flex-1 items-center gap-1">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-stone-100 text-brand-primary' : 'text-stone-600 hover:bg-stone-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50"
            >
              Shop <ChevronDown size={14} />
            </button>
            {shopOpen ? (
              <div className="absolute left-0 top-full z-50 mt-1 w-[520px] rounded-2xl border border-brand-border bg-white p-4 shadow-xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-muted">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/categories/${cat.slug}`}
                      className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-stone-50"
                      onClick={() => setShopOpen(false)}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-stone-50">
                        <img src={cat.image} alt="" className="h-full w-full object-contain p-0.5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: CATEGORY_COLORS[cat.id] }}>
                          {cat.name}
                        </p>
                        <p className="text-xs text-brand-muted line-clamp-1">{cat.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/categories"
                  className="mt-3 block text-center text-sm font-semibold text-brand-primary"
                  onClick={() => setShopOpen(false)}
                >
                  View all categories →
                </Link>
              </div>
            ) : null}
          </div>
        </nav>

        <Link
          to="/search"
          className="flex max-w-xs flex-1 items-center gap-2 rounded-xl border border-brand-border bg-stone-50 px-4 py-2 text-sm text-brand-muted transition hover:border-stone-300"
        >
          <Search size={16} />
          <span>Search products...</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link to="/wishlist" className="flex h-10 w-10 items-center justify-center rounded-xl text-stone-600 hover:bg-stone-100" aria-label="Wishlist">
            <Heart size={18} />
          </Link>
          <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-xl text-stone-600 hover:bg-stone-100" aria-label="Cart">
            <ShoppingBag size={18} />
            {cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary text-[9px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>
          <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-xl text-stone-600 hover:bg-stone-100" aria-label="Account">
            <User size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}
