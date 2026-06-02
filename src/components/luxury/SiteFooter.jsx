import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-white/5 page-pad pb-nav md:pb-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-xl font-extrabold md:text-2xl">
          <span className="text-luxury-primary">DRY</span>TUCH
        </p>
        <p className="mt-2 max-w-sm text-sm text-luxury-muted">
          Premium dry meat, fruits, vegetables & nuts. Natural · Healthy · Premium.
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/65">
          <Link to="/categories" className="hover:text-white">Shop</Link>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
          <Link to="/offers" className="hover:text-white">Offers</Link>
          <Link to="/profile" className="hover:text-white">Account</Link>
        </nav>
        <p className="mt-8 text-xs text-white/30">
          © {new Date().getFullYear()} DryTuch.com · All rights reserved
        </p>
      </div>
    </footer>
  );
}
