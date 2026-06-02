import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight } from 'lucide-react';
import { categoryService } from '../../api';
import ProductImage from '../ui/ProductImage';
import Skeleton from '../ui/Skeleton';

export default function CategoryGridLuxury() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  if (isLoading) {
    return (
      <section className="page-pad">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-[4/5]" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="page-pad pt-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="section-eyebrow">Explore</p>
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <Link to="/categories" className="text-sm font-semibold text-luxury-primary hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/categories/${cat.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl card-luxury"
            >
              <ProductImage
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3 md:p-4">
                <div>
                  <h3 className="font-display text-sm font-bold md:text-base">{cat.name}</h3>
                  <p className="mt-0.5 hidden line-clamp-1 text-[11px] text-white/55 sm:block">
                    {cat.description}
                  </p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition group-hover:bg-luxury-primary">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
