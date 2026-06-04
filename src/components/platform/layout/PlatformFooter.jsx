import { Link } from 'react-router-dom';
import { SHIPPING_COUNTRIES } from '../../../constants/brand';

export default function PlatformFooter() {
  return (
    <footer className="border-t border-brand-border bg-white pb-nav md:pb-10">
      <div className="container-brand py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="font-display text-xl font-extrabold">
              <a href="https://drytuch.com" className="text-brand-primary hover:opacity-90">
                DRY<span className="text-stone-900">TUCH</span>.com
              </a>
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              Official store — premium sun-dried foods. India · UAE · USA · UK · Worldwide.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Shop</p>
            <nav className="mt-3 flex flex-col gap-2 text-sm">
              <Link to="/categories/dry-meat" className="hover:text-brand-primary">Dry Meat</Link>
              <Link to="/categories/dry-seafood" className="hover:text-brand-primary">Dry Seafood</Link>
              <Link to="/categories/dry-vegetables" className="hover:text-brand-primary">Dry Vegetables</Link>
              <Link to="/categories/dry-fruits" className="hover:text-brand-primary">Dry Fruits</Link>
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Company</p>
            <nav className="mt-3 flex flex-col gap-2 text-sm">
              <Link to="/about" className="hover:text-brand-primary">About Us</Link>
              <Link to="/contact" className="hover:text-brand-primary">Contact</Link>
              <Link to="/faq" className="hover:text-brand-primary">FAQ</Link>
              <Link to="/orders" className="hover:text-brand-primary">Orders</Link>
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Shipping</p>
            <p className="mt-3 text-sm text-brand-muted">{SHIPPING_COUNTRIES.join(' · ')}</p>
          </div>
        </div>
        <p className="mt-10 border-t border-stone-100 pt-6 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} DRYTUCH.com · All rights reserved
        </p>
      </div>
    </footer>
  );
}
