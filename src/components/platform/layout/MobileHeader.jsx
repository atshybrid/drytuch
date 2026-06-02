import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import { selectCartCount } from '../../../store/slices/cartSlice';
import BrandLogo from '../../layout/BrandLogo';

const titles = {
  '/categories': 'Categories',
  '/search': 'Search',
  '/cart': 'Cart',
  '/profile': 'Account',
  '/orders': 'Orders',
  '/checkout': 'Checkout',
  '/about': 'About',
  '/contact': 'Contact',
  '/faq': 'FAQ',
  '/wishlist': 'Wishlist',
};

export default function MobileHeader() {
  const { pathname } = useLocation();
  const cartCount = useSelector(selectCartCount);
  const isHome = pathname === '/';
  const isProduct = pathname.startsWith('/product/');
  if (isHome || isProduct) return null;

  const title = Object.entries(titles).find(([p]) => pathname.startsWith(p))?.[1] || 'DRYTUCH';

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-white/95 backdrop-blur-md safe-top md:hidden">
      <div className="flex h-12 items-center justify-between px-4">
        <BrandLogo size="sm" linkTo="/" />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-bold">{title}</h1>
        <Link to="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100">
          <ShoppingBag size={16} />
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary text-[9px] font-bold text-white">
              {cartCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
