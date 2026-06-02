import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviewService } from '../../../api';

export default function TestimonialsSection() {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', 'home'],
    queryFn: () => reviewService.getByProduct('2'),
  });

  return (
    <section className="section-pad bg-stone-50">
      <div className="container-brand">
        <p className="eyebrow">Testimonials</p>
        <h2 className="heading-lg mt-2">Loved worldwide</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.slice(0, 3).map((r, i) => (
            <motion.blockquote
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-card p-6"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < r.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">&ldquo;{r.comment}&rdquo;</p>
              <footer className="mt-4 flex items-center gap-3 border-t border-stone-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                  {r.userName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{r.userName}</p>
                  <p className="text-xs text-brand-muted">Verified buyer</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
