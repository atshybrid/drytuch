import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categoryService } from '../../../api';
import { CATEGORY_COLORS } from '../../../constants/brand';
import ProductImage from '../../ui/ProductImage';

const MAIN_CATS = ['dry-meat', 'dry-vegetables', 'dry-fruits', 'dry-seafood'];

export default function CategoryShowcase() {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  const shown = MAIN_CATS.map((id) => categories.find((c) => c.id === id)).filter(Boolean);

  return (
    <section className="section-pad bg-stone-50">
      <div className="container-brand">
        <p className="eyebrow">Shop By Category</p>
        <h2 className="heading-lg mt-2">Four collections. One craft.</h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <Link
                to={`/categories/${cat.slug}`}
                className="group block overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[5/4] overflow-hidden border-b border-stone-100">
                  <ProductImage
                    src={cat.image}
                    alt={cat.name}
                    fit="contain"
                    className="h-full w-full transition duration-300 group-hover:scale-[1.02]"
                    imgClassName="group-hover:scale-105 transition duration-500"
                  />
                  <div
                    className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm"
                    style={{ background: CATEGORY_COLORS[cat.id] || '#8B1E1E' }}
                  >
                    {cat.name}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-brand-muted line-clamp-2">{cat.description}</p>
                  <p className="mt-2 text-xs font-semibold text-stone-500">
                    {cat.productCount ?? '—'} products
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-primary">
                    Shop now <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
