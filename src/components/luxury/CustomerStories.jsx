import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { reviewService } from '../../api';
import { Star } from 'lucide-react';

export default function CustomerStories() {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', 'stories'],
    queryFn: () => reviewService.getByProduct('1'),
  });

  return (
    <section className="px-4 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-luxury-secondary">
        Stories
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold">Customer love.</h2>

      <div className="mt-6 flex gap-4 overflow-x-auto hide-scrollbar snap-x pb-2">
        {reviews.map((r) => (
          <motion.blockquote
            key={r.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-[300px] shrink-0 snap-center rounded-3xl card-luxury p-6"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  size={14}
                  className={
                    j < r.rating ? 'fill-luxury-secondary text-luxury-secondary' : 'text-white/20'
                  }
                />
              ))}
            </div>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              &ldquo;{r.comment}&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-luxury-primary font-bold">
                {r.userName.charAt(0)}
              </div>
              <cite className="not-italic font-semibold">{r.userName}</cite>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
