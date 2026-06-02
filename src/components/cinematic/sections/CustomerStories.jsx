import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviewService } from '../../../api';

export default function CustomerStories() {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', 'cinematic'],
    queryFn: () => reviewService.getByProduct('1'),
  });

  return (
    <section className="cinematic-section cinematic-section-dark">
      <div className="cinematic-container">
        <p className="cinematic-eyebrow">Customer Stories</p>
        <h2 className="cinematic-heading">Real people.<br />Real flavor.</h2>
      </div>

      <div className="mt-12 flex gap-6 overflow-x-auto px-6 pb-4 hide-scrollbar md:mt-16 md:px-16">
        {reviews.map((r, i) => (
          <motion.blockquote
            key={r.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="story-card w-[320px] shrink-0 md:w-[380px]"
          >
            <Quote size={28} className="text-luxury-primary/40" />
            <div className="mt-4 flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  size={12}
                  className={
                    j < r.rating ? 'fill-luxury-secondary text-luxury-secondary' : 'text-white/15'
                  }
                />
              ))}
            </div>
            <p className="mt-4 text-lg leading-relaxed text-stone-700">
              &ldquo;{r.comment}&rdquo;
            </p>
            <footer className="mt-8 flex items-center gap-3 border-t border-stone-100 pt-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-luxury-primary font-bold">
                {r.userName.charAt(0)}
              </div>
              <cite className="not-italic">
                <p className="font-semibold">{r.userName}</p>
                <p className="text-xs text-stone-400">Verified buyer</p>
              </cite>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
