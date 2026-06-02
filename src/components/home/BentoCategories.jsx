import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../api';
import { ArrowUpRight } from 'lucide-react';
import ProductImage from '../ui/ProductImage';

export default function BentoCategories() {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  if (categories.length < 4) return null;

  const [large, ...rest] = categories;

  return (
    <div className="mt-6 px-4">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="font-display text-xl font-bold tracking-tight">Categories</h2>
        <Link to="/categories" className="text-sm font-bold text-primary">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-3" style={{ height: '320px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="row-span-2"
        >
          <Link
            to={`/categories/${large.slug}`}
            className="group relative block h-full overflow-hidden rounded-3xl"
          >
            <ProductImage
              src={large.image}
              alt={large.name}
              className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Featured
              </p>
              <p className="font-display text-2xl font-bold">{large.name}</p>
              <span className="mt-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        </motion.div>

        {rest.slice(0, 2).map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * (i + 1) }}
          >
            <Link
              to={`/categories/${cat.slug}`}
              className="group relative block h-full overflow-hidden rounded-2xl"
            >
              <ProductImage
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 h-full w-full transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/40" />
              <p className="absolute bottom-2.5 left-3 font-display text-sm font-bold text-white">
                {cat.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
