import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { categoryService } from '../../api';

export default function CategoryGrid() {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  return (
    <div className="flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="w-[140px] shrink-0"
        >
          <Link
            to={`/categories/${cat.slug}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-md"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${cat.color}ee 0%, ${cat.color}66 40%, transparent 70%)`,
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="font-display text-sm font-bold leading-tight text-white">
                {cat.name}
              </p>
              <span className="mt-1 inline-flex items-center text-[10px] font-medium text-white/90">
                Shop now <ChevronRight size={12} />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
