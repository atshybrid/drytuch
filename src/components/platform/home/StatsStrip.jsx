import { motion } from 'framer-motion';
import { Globe, Package, Sparkles, Users } from 'lucide-react';

const STATS = [
  { icon: Sparkles, value: '100%', label: 'Natural ingredients' },
  { icon: Package, value: '50+', label: 'Premium products' },
  { icon: Globe, value: '9', label: 'Countries shipped' },
  { icon: Users, value: '10K+', label: 'Happy customers' },
];

export default function StatsStrip() {
  return (
    <section className="border-y border-brand-border bg-white py-8">
      <div className="container-brand">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <Icon size={20} />
              </div>
              <p className="font-display text-2xl font-extrabold text-stone-900 md:text-3xl">{value}</p>
              <p className="mt-1 text-sm text-brand-muted">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
