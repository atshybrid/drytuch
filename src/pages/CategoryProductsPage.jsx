import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productService, categoryService } from '../api';
import ProductCard from '../components/platform/product/ProductCard';
import ProductImage from '../components/ui/ProductImage';
import Loading from '../components/ui/Loading';
import { CATEGORY_COLORS } from '../constants/brand';

const SORTS = [
  { id: 'popularity', label: 'Popularity' },
  { id: 'price-asc', label: 'Price: Low' },
  { id: 'price-desc', label: 'Price: High' },
  { id: 'newest', label: 'Newest' },
];

export default function CategoryProductsPage() {
  const { slug } = useParams();
  const [sort, setSort] = useState('popularity');
  const [maxPrice, setMaxPrice] = useState('');

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  const category = categories.find((c) => c.slug === slug) || categories.find((c) => c.id === slug);

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products', 'category', slug],
    queryFn: () => productService.getByCategory(slug),
    enabled: !!slug,
  });

  const filtered = useMemo(() => {
    let list = [...products];
    if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      default:
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return list;
  }, [products, sort, maxPrice]);

  if (categoriesLoading || productsLoading) return <Loading />;

  return (
    <div className="pb-nav md:pb-10">
      {category ? (
        <div
          className="relative overflow-hidden py-12 text-white md:py-16"
          style={{ background: `linear-gradient(135deg, ${CATEGORY_COLORS[category.id] || '#8B1E1E'} 0%, #1c1917 100%)` }}
        >
          <div className="container-brand flex items-center gap-6">
            <div className="hidden h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/30 bg-white/95 shadow-lg md:block">
              <ProductImage src={category.image} alt="" pad={false} className="h-full w-full" />
            </div>
            <div>
              <Link to="/categories" className="text-sm text-white/70 hover:text-white">← All categories</Link>
              <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">{category.name}</h1>
              <p className="mt-2 max-w-lg text-white/80">{category.description}</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container-brand py-6">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-brand-border bg-white p-4">
          <span className="text-sm font-semibold text-stone-600">Sort:</span>
          {SORTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSort(s.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                sort === s.id ? 'bg-brand-primary text-white' : 'bg-stone-100 text-stone-600'
              }`}
            >
              {s.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="max-price" className="text-sm text-stone-600">Max ₹</label>
            <input
              id="max-price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Any"
              className="input-brand w-24 py-1.5"
            />
          </div>
        </div>

        <p className="mt-4 text-sm text-brand-muted">{filtered.length} products</p>

        <div className="product-grid mt-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
