import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Plus, Star } from 'lucide-react';
import { addToCart } from '../../../store/slices/cartSlice';
import { showToast } from '../../../store/slices/uiSlice';
import { formatPrice } from '../../../utils/format';
import ProductImage from '../../ui/ProductImage';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(showToast(`${product.title} added`));
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden border-b border-stone-100">
        <ProductImage
          src={product.image}
          alt={product.title}
          fit="contain"
          className="h-full w-full"
          imgClassName="transition duration-300 group-hover:scale-105"
        />
        {product.discount ? (
          <span className="absolute left-2 top-2 z-10 rounded-lg bg-brand-primary px-2 py-0.5 text-[10px] font-bold text-white">
            -{product.discount}%
          </span>
        ) : null}
        <button
          type="button"
          onClick={handleAdd}
          className="absolute bottom-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-brand-primary shadow-md transition hover:bg-brand-primary hover:text-white"
          aria-label="Add to cart"
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>
      <div className="p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-muted">{product.weight}</p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug">{product.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-base font-bold text-brand-primary">{formatPrice(product.price)}</span>
          {product.rating ? (
            <span className="flex items-center gap-0.5 text-[11px] text-brand-muted">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
