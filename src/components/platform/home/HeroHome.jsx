import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Leaf, Shield, Truck } from 'lucide-react';
import { BRAND, SHIPPING_COUNTRIES } from '../../../constants/brand';
import ProductImage from '../../ui/ProductImage';

const TRUST = [
  { icon: Leaf, label: '100% Natural' },
  { icon: Shield, label: 'No Preservatives' },
  { icon: Truck, label: 'Global Delivery' },
  { icon: Globe, label: '9 Countries' },
];

export default function HeroHome() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#fef3c7_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_#fee2e2_0%,_transparent_45%)]" />

      <div className="container-brand relative py-8 md:py-12 lg:py-16">
        {/* Top trust strip */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-brand-border bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm md:justify-between"
        >
          {TRUST.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <Icon size={14} className="text-brand-primary" />
              {label}
            </span>
          ))}
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="eyebrow text-brand-primary">Farm To Table · Worldwide Shipping</p>
            <h1 className="heading-xl mt-3 leading-[1.05]">{BRAND.tagline}</h1>
            <p className="mt-4 text-lg font-semibold text-stone-700">{BRAND.subline}</p>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-brand-muted">{BRAND.support}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/categories/dry-meat" className="btn-brand px-8 py-3.5">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link to="/categories" className="btn-brand-outline px-8 py-3.5">
                Explore Categories
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {BRAND.message.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-600 shadow-sm"
                >
                  {m}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Landing image — full visible, no crop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-brand-border bg-white shadow-2xl">
              <ProductImage
                src="/drytuch_landing.png"
                alt="DRYTUCH Premium Sun-Dried Foods"
                fit="contain"
                pad={false}
                className="min-h-[280px] w-full sm:min-h-[360px] lg:min-h-[480px]"
                imgClassName="!object-contain !p-0 max-h-[520px]"
                loading="eager"
              />
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-4 left-4 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-lg md:left-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Premium Quality</p>
              <p className="font-display text-lg font-extrabold text-brand-primary">DRYTUCH</p>
            </div>
          </motion.div>
        </div>

        {/* Countries marquee */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-brand-border bg-stone-50 py-3">
          <div className="flex animate-marquee gap-8 whitespace-nowrap px-4">
            {[...SHIPPING_COUNTRIES, ...SHIPPING_COUNTRIES].map((c, i) => (
              <span key={`${c}-${i}`} className="text-sm font-semibold text-stone-500">
                ✦ {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
