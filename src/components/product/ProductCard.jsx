import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Plus, Star } from 'lucide-react';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../../store/slices/wishlistSlice';
import { showToast } from '../../store/slices/uiSlice';
import { formatPrice } from '../../utils/format';
import ProductImage from '../ui/ProductImage';

/** Trending overlay-price product card */
export default function ProductCard({
  product,
  compact = false,
  featured = false,
  index = 0,
}) {
  const dispatch = useDispatch();
  const inWishlist = useSelector(selectIsInWishlist(product.id));

  const add = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    dispatch(addToCart(product));
    dispatch(showToast(`Added ${product.title}`));
  };

  const wish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-4 overflow-hidden rounded-[2rem] surface-elevated-lg"
      >
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative aspect-[16/10]">
            <ProductImage
              src={product.image}
              alt={product.title}
              className="absolute inset-0 h-full w-full"
            />
            <div className="gradient-hero absolute inset-0" />
            {product.discount ? (
              <span className="absolute left-4 top-4 rounded-xl bg-accent-hot px-3 py-1 text-xs font-black text-white">
                {product.discount}% OFF
              </span>
            ) : null}
            <button
              type="button"
              onClick={wish}
              className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl ${
                inWishlist ? 'bg-accent-hot text-white' : 'glass-ultra'
              }`}
            >
              <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Editor&apos;s pick
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold leading-tight">
                {product.title}
              </h3>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <span className="font-display text-2xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price ? (
                    <span className="ml-2 text-sm text-white/50 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={add}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ink shadow-lg"
                >
                  <Plus size={22} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  const width = compact ? 'w-[156px]' : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${width} shrink-0 overflow-hidden rounded-3xl surface-elevated`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
          <ProductImage
            src={product.image}
            alt={product.title}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

          {product.discount ? (
            <span className="absolute left-2.5 top-2.5 rounded-lg bg-white px-2 py-0.5 text-[10px] font-black text-accent-hot">
              -{product.discount}%
            </span>
          ) : null}

          <button
            type="button"
            onClick={wish}
            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm"
          >
            <Heart size={14} fill={inWishlist ? '#ff4d4d' : 'none'} color={inWishlist ? '#ff4d4d' : 'white'} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="line-clamp-2 text-sm font-bold leading-snug">
              {product.title}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-white/80">
              <Star size={10} className="fill-accent text-accent" />
              {product.rating} · {product.weight}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-display text-lg font-bold">
                {formatPrice(product.price)}
              </span>
              <button
                type="button"
                onClick={add}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink"
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
