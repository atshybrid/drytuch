import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { reviewService } from '../../api';

export default function CustomerReviews() {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', 'featured'],
    queryFn: () => reviewService.getByProduct('1'),
  });

  return (
    <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar snap-x">
      {reviews.slice(0, 4).map((r) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-[280px] shrink-0 snap-start rounded-3xl surface-elevated p-5"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, j) => (
              <Star
                key={j}
                size={14}
                className={j < r.rating ? 'fill-accent text-accent' : 'text-stone-200'}
              />
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            &ldquo;{r.comment}&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-3 border-t border-stone-100 pt-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink font-display text-sm font-bold text-white">
              {r.userName.charAt(0)}
            </div>
            <span className="font-semibold text-ink">{r.userName}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
