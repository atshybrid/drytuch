import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { categoryService } from '../api';
import ProductImage from '../components/ui/ProductImage';
import { CATEGORY_COLORS } from '../constants/brand';

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  if (isLoading) {
    return (
      <div className="page-wrap space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 shimmer rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="page-wrap pb-nav md:pb-10">
      <p className="eyebrow">Shop</p>
      <h1 className="heading-lg mt-2">All Categories</h1>

      <div className="mt-6 space-y-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/categories/${cat.slug}`}
            className="flex items-center gap-4 rounded-2xl border border-brand-border bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <ProductImage src={cat.image} alt="" pad={false} className="h-20 w-20 shrink-0 rounded-xl" imgClassName="p-1.5" />
            <div className="flex-1">
              <p className="font-display text-lg font-bold" style={{ color: CATEGORY_COLORS[cat.id] }}>
                {cat.name}
              </p>
              <p className="text-sm text-brand-muted line-clamp-1">{cat.description}</p>
            </div>
            <ArrowRight size={18} className="text-stone-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
