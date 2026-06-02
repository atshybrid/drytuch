import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Plus, Star, MapPin, Clock, Leaf } from 'lucide-react';
import { productService, reviewService } from '../api';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../store/slices/wishlistSlice';
import { showToast } from '../store/slices/uiSlice';
import { formatPrice } from '../utils/format';
import ProductImage from '../components/ui/ProductImage';
import Loading from '../components/ui/Loading';
import ProductCard from '../components/platform/product/ProductCard';
import Badge from '../components/ui/Badge';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inWishlist = useSelector(selectIsInWishlist(id));
  const [activeImg, setActiveImg] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => reviewService.getByProduct(id),
    enabled: !!id,
  });

  const { data: related = [] } = useQuery({
    queryKey: ['related', product?.categoryId],
    queryFn: () =>
      productService.getByCategory(product.categoryId).then((items) =>
        items.filter((p) => p.id !== id).slice(0, 4)
      ),
    enabled: !!product?.categoryId,
  });

  if (isLoading || !product) return <Loading fullScreen />;

  const images = product.images || [product.image];

  const addAndGo = (checkout = false) => {
    dispatch(addToCart(product));
    dispatch(showToast('Added to cart'));
    if (checkout) navigate('/checkout');
  };

  return (
    <div className="pb-32 md:pb-8">
      <div className="container-brand py-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-lg">
              <ProductImage src={images[activeImg]} alt={product.title} className="aspect-[4/5] w-full max-h-[560px]" />
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar">
              {images.map((img, i) => (
                <button key={i} type="button" onClick={() => setActiveImg(i)}>
                  <ProductImage
                    src={img}
                    alt=""
                    pad={false}
                    className={`h-16 w-16 rounded-xl border-2 ${activeImg === i ? 'border-brand-primary' : 'border-transparent'}`}
                    imgClassName="p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <Badge color="muted">{product.weight}</Badge>
              {product.rating ? (
                <span className="flex items-center gap-1 text-sm text-brand-muted">
                  <Star size={14} className="fill-amber-400 text-amber-400" /> {product.rating}
                </span>
              ) : null}
            </div>
            <h1 className="heading-lg mt-3">{product.title}</h1>
            <p className="mt-3 font-display text-3xl font-bold text-brand-primary">{formatPrice(product.price)}</p>
            <p className="mt-4 text-brand-muted leading-relaxed">{product.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="glass-card p-3 text-sm">
                <MapPin size={16} className="text-brand-primary" />
                <p className="mt-1 font-semibold">Origin</p>
                <p className="text-brand-muted">{product.origin || 'India'}</p>
              </div>
              <div className="glass-card p-3 text-sm">
                <Clock size={16} className="text-brand-primary" />
                <p className="mt-1 font-semibold">Shelf Life</p>
                <p className="text-brand-muted">{product.shelfLife || '12 months'}</p>
              </div>
              <div className="glass-card p-3 text-sm">
                <Leaf size={16} className="text-brand-primary" />
                <p className="mt-1 font-semibold">Ingredients</p>
                <p className="text-brand-muted">{product.ingredients || product.title}</p>
              </div>
            </div>

            {product.benefits?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.benefits.map((b) => (
                  <span key={b} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">{b}</span>
                ))}
              </div>
            ) : null}

            {Object.keys(product.nutrition || {}).length > 0 ? (
              <div className="mt-6">
                <h2 className="font-display font-bold">Nutrition Facts</h2>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {Object.entries(product.nutrition).map(([k, v]) => (
                    <div key={k} className="glass-card p-3">
                      <p className="text-[10px] font-bold uppercase text-brand-muted">{k}</p>
                      <p className="font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {reviews.length > 0 ? (
          <section className="mt-12">
            <h2 className="heading-lg">Reviews</h2>
            <div className="mt-4 space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="glass-card p-4">
                  <p className="font-semibold">{r.userName}</p>
                  <p className="mt-1 text-sm text-brand-muted">{r.comment}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="heading-lg">Related Products</h2>
            <div className="product-grid mt-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <div className="fixed bottom-[var(--nav-h)] left-0 right-0 z-40 border-t border-brand-border bg-white p-4 md:bottom-0 md:static md:mt-8 md:border-0 md:p-0">
        <div className="container-brand flex gap-3 md:px-0">
          <button
            type="button"
            onClick={() => dispatch(toggleWishlist(product))}
            className={`flex h-12 w-12 items-center justify-center rounded-xl border ${inWishlist ? 'border-brand-primary bg-brand-primary text-white' : 'border-brand-border'}`}
          >
            <Heart size={20} fill={inWishlist ? 'white' : 'none'} />
          </button>
          <button type="button" onClick={() => addAndGo(false)} className="btn-brand-outline flex-1">
            <Plus size={18} /> Add to Cart
          </button>
          <button type="button" onClick={() => addAndGo(true)} className="btn-brand flex-1">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
