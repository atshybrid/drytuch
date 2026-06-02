import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { productService } from '../../../api';
import { addToCart } from '../../../store/slices/cartSlice';
import { showToast } from '../../../store/slices/uiSlice';
import { formatPrice } from '../../../utils/format';
import MagneticButton from '../shared/MagneticButton';

export default function BestSellersShowcase() {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  const { data: products = [] } = useQuery({
    queryKey: ['products', 'bestsellers'],
    queryFn: productService.getBestSellers,
  });

  if (products.length === 0) return null;

  const product = products[index % products.length];
  const next = () => setIndex((i) => (i + 1) % products.length);
  const prev = () => setIndex((i) => (i - 1 + products.length) % products.length);

  const handleAdd = () => {
    dispatch(addToCart(product));
    dispatch(showToast(`${product.title} added`));
  };

  return (
    <section className="cinematic-section" id="collection">
      <div className="cinematic-container">
        <p className="cinematic-eyebrow">Best Sellers</p>
        <h2 className="cinematic-heading">The collection.</h2>
      </div>

      <div className="relative mx-auto mt-12 max-w-6xl px-6 md:mt-16">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-luxury-surface">
            <AnimatePresence mode="wait">
              <motion.img
                key={product.id}
                src={product.image}
                alt={product.title}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                loading="lazy"
              />
            </AnimatePresence>
          </div>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-luxury-secondary">
                  {product.weight}
                </p>
                <h3 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">
                  {product.title}
                </h3>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-stone-600 md:text-base">
                  {product.description}
                </p>
                <p className="mt-6 font-display text-4xl font-bold text-luxury-secondary">
                  {formatPrice(product.price)}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <MagneticButton onClick={handleAdd} className="px-8 py-4 text-sm">
                    <Plus size={18} /> Add to Cart
                  </MagneticButton>
                  <MagneticButton
                    to={`/product/${product.id}`}
                    variant="outline"
                    className="px-8 py-4 text-sm"
                  >
                    View Details
                  </MagneticButton>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-4">
              <button type="button" onClick={prev} className="btn-cinematic-ghost" aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {products.slice(0, 6).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index % products.length ? 'w-8 bg-luxury-primary' : 'w-1.5 bg-white/20'
                    }`}
                    aria-label={`Product ${i + 1}`}
                  />
                ))}
              </div>
              <button type="button" onClick={next} className="btn-cinematic-ghost" aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
