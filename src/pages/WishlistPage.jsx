import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { selectWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { showToast } from '../store/slices/uiSlice';
import { formatPrice } from '../utils/format';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import ProductImage from '../components/ui/ProductImage';

export default function WishlistPage() {
  const items = useSelector(selectWishlist);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Heart size={28} />}
        title="Wishlist is empty"
        description="Save products you love for later"
        action={
          <Link to="/categories">
            <Button>Browse Products</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="page-pad">
      <p className="text-sm text-luxury-muted">{items.length} saved items</p>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-2xl card-luxury p-3">
            <Link to={`/product/${item.id}`}>
              <ProductImage src={item.image} alt="" pad={false} className="h-20 w-20 rounded-xl" imgClassName="p-1.5" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <Link to={`/product/${item.id}`} className="truncate font-semibold hover:text-luxury-secondary">
                {item.title}
              </Link>
              <p className="font-display font-bold text-luxury-secondary">{formatPrice(item.price)}</p>
              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(addToCart(item));
                    dispatch(showToast('Added to cart'));
                  }}
                  className="flex items-center gap-1 rounded-lg bg-luxury-primary px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <ShoppingCart size={12} />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="flex items-center gap-1 text-xs text-red-400"
                >
                  <Trash2 size={12} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
