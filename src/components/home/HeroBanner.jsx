import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { miscService } from '../../api';
import ProductImage from '../ui/ProductImage';

export default function HeroBanner() {
  const { data: banners = [] } = useQuery({
    queryKey: ['banners'],
    queryFn: miscService.getBanners,
  });
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(banners.length, 1));
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [banners.length, next]);

  if (!banners.length) return null;
  const banner = banners[index];

  return (
    <div className="mt-4 px-4 md:px-0">
      <div className="relative aspect-[4/5] max-h-[420px] overflow-hidden rounded-[2rem] surface-elevated-lg md:aspect-[21/9] md:max-h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <ProductImage
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 h-full w-full"
            />
            <div className="gradient-hero absolute inset-0" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-5 right-5 top-5">
          <span className="inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
            <Sparkles size={12} className="text-accent" />
            Premium Quality
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-sm font-medium text-white/75">{banner.subtitle}</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold leading-[1.1] tracking-tight">
            {banner.title}
          </h2>
          <Link
            to={banner.link || '/categories'}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-ink shadow-xl"
          >
            {banner.cta || 'Shop now'}
            <ChevronRight size={18} strokeWidth={2.5} />
          </Link>
        </div>

        {banners.length > 1 ? (
          <div className="absolute bottom-6 right-6 flex gap-1">
            {banners.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all ${
                  i === index ? 'w-6 bg-white' : 'w-1 bg-white/40'
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
