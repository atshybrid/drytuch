import { Link } from 'react-router-dom';
import { SHIPPING_COUNTRIES } from '../../../constants/brand';
import { COUNTRY_KEYWORDS } from '../../../constants/seo';

/** Visible SEO-rich content for Google & AI crawlers */
export default function InternationalSeoSection() {
  return (
    <section className="border-t border-brand-border bg-stone-50 py-12" aria-label="DRYTUCH worldwide shipping">
      <div className="container-brand max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-stone-900">
          DRYTUCH.com — Official Premium Sun-Dried Food Store
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-brand-muted">
          <strong>DRYTUCH</strong> (drytuch.com) is the official brand for premium sun-dried dry meat, dry
          chicken, dry mutton, dry vegetables, dry fruits, dry seafood and nuts. We are a{' '}
          <strong>food brand</strong> — not Drytech, not dry-touch skincare or textile products. Every product
          is naturally sun-dried with <strong>no preservatives</strong>, farm-sourced and vacuum packed for
          long shelf life.
        </p>

        <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-brand-primary">
          International delivery — 9 countries
        </h3>
        <p className="mt-2 text-sm text-brand-muted">
          Order DRYTUCH online with shipping to: {SHIPPING_COUNTRIES.join(', ')}.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          <li className="rounded-xl border border-brand-border bg-white p-4 text-sm text-stone-600">
            <strong className="text-stone-900">India:</strong> {COUNTRY_KEYWORDS.India.join(' · ')}
          </li>
          <li className="rounded-xl border border-brand-border bg-white p-4 text-sm text-stone-600">
            <strong className="text-stone-900">UAE & Gulf:</strong> {COUNTRY_KEYWORDS.UAE.join(' · ')}
          </li>
          <li className="rounded-xl border border-brand-border bg-white p-4 text-sm text-stone-600">
            <strong className="text-stone-900">USA:</strong> {COUNTRY_KEYWORDS.USA.join(' · ')}
          </li>
          <li className="rounded-xl border border-brand-border bg-white p-4 text-sm text-stone-600">
            <strong className="text-stone-900">UK & Canada:</strong>{' '}
            {[...COUNTRY_KEYWORDS.UK, ...COUNTRY_KEYWORDS.Canada].join(' · ')}
          </li>
        </ul>

        <nav className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-brand-primary">
          <Link to="/categories/dry-meat">Dry Meat</Link>
          <Link to="/categories/dry-vegetables">Dry Vegetables</Link>
          <Link to="/categories/dry-fruits">Dry Fruits</Link>
          <Link to="/categories/dry-seafood">Dry Seafood</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact DRYTUCH</Link>
        </nav>
      </div>
    </section>
  );
}
