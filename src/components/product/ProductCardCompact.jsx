import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { addToCart } from '../../store/slices/cartSlice';
import { showToast } from '../../store/slices/uiSlice';
import { formatPrice } from '../../utils/format';
import ProductImage from '../ui/ProductImage';

export default function ProductCardCompact({ product, index = 0 }) {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(showToast(`${product.title} added`));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-2xl card-luxury-hover">
        <div className="relative aspect-square overflow-hidden bg-luxury-surface">
          <ProductImage
            src={product.image}
            alt={product.title}
            className="h-full w-full transition duration-500 group-hover:scale-105"
          />
          {product.discount ? (
            <span className="absolute left-2 top-2 rounded-lg bg-luxury-primary px-2 py-0.5 text-[10px] font-black">
              -{product.discount}%
            </span>
          ) : null}
          <button
            type="button"
            onClick={handleAdd}
            className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black opacity-0 shadow-lg transition group-hover:opacity-100 md:opacity-100"
            aria-label="Add to cart"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
        <div className="p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-luxury-muted">
            {product.weight}
          </p>
          <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug">
            {product.title}
          </h3>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="font-display text-base font-bold text-luxury-secondary">
              {formatPrice(product.price)}
            </span>
            {product.rating ? (
              <span className="flex items-center gap-0.5 text-[11px] text-luxury-muted">
                <Star size={11} className="fill-luxury-secondary text-luxury-secondary" />
                {product.rating}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
