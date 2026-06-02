import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { addToCart } from '../../store/slices/cartSlice';
import { showToast } from '../../store/slices/uiSlice';
import { formatPrice } from '../../utils/format';
import ProductImage from '../ui/ProductImage';

/** Product card — local image with subtle zoom (reel-style) */
export default function VideoProductCard({ product, index = 0 }) {
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const img = el.querySelector('img');
        if (img && entry.isIntersecting) {
          img.style.animation = 'kenburns 12s ease-out infinite alternate';
        } else if (img) {
          img.style.animation = 'none';
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(showToast(`${product.title} added`));
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="relative h-[420px] w-[280px] shrink-0 snap-center overflow-hidden rounded-3xl card-luxury md:h-[480px] md:w-[300px]"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <ProductImage
          src={product.image}
          alt={product.title}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

        <div className="absolute left-3 top-3 rounded-full glass-luxury px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90">
          Premium
        </div>

        {product.discount ? (
          <span className="absolute right-3 top-3 rounded-lg bg-luxury-primary px-2 py-1 text-xs font-black">
            -{product.discount}%
          </span>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-luxury-secondary">
            {product.weight}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold leading-tight">
            {product.title}
          </h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-display text-2xl font-bold">
              {formatPrice(product.price)}
            </span>
            <button
              type="button"
              onClick={handleAdd}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black shadow-lg"
              aria-label="Add to cart"
            >
              <Plus size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
