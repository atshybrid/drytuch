import { Link } from 'react-router-dom';
import { Beef, Leaf, Cherry } from 'lucide-react';
import { BRAND } from '../constants';
import BrandLogo from '../components/layout/BrandLogo';

const highlights = [
  { icon: Beef, label: 'Dry Meat', to: '/categories/dry-meat' },
  { icon: Leaf, label: 'Vegetables', to: '/categories/dry-vegetables' },
  { icon: Cherry, label: 'Fruits & Nuts', to: '/categories/dry-fruits' },
];

export default function AboutPage() {
  return (
    <div className="page-pad">
      <div className="flex flex-col items-center text-center">
        <img src="/logo.png" alt="DryTuch" className="mb-4 h-24 w-auto md:h-28" />
        <BrandLogo size="lg" linkTo={null} />
        <p className="mt-2 text-sm font-medium tracking-widest text-luxury-secondary">
          {BRAND.tagline}
        </p>
      </div>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-white/70">
        <p>
          <strong className="text-white">DryTuch.com</strong> is India&apos;s premier online
          destination for premium dried meats, vegetables, fruits, and nuts. We source the finest
          ingredients and use traditional drying methods to preserve natural flavor and nutrition.
        </p>
        <p>
          From handcrafted dry chicken to sun-dried tomatoes, dates to raisins — every product is
          carefully curated for quality, taste, and health.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {highlights.map(({ icon: Icon, label, to }) => (
          <Link
            key={label}
            to={to}
            className="flex flex-col items-center gap-2 rounded-xl card-luxury p-3 text-center transition hover:bg-luxury-card-hover"
          >
            <Icon size={22} className="text-luxury-secondary" />
            <span className="text-xs font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
