import { motion } from 'framer-motion';
import { Leaf, Shield, Dumbbell, Globe, Tractor, Award } from 'lucide-react';
import { WHY_ITEMS } from '../../../constants/brand';

const icons = [Leaf, Shield, Dumbbell, Globe, Tractor, Award];

export default function WhySection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-brand">
        <p className="eyebrow">Why DRYTUCH</p>
        <h2 className="heading-lg mt-2">Premium you can trust</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ITEMS.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="glass-card p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-brand-primary">
                  <Icon size={20} />
                </div>
                <h3 className="mt-3 font-display font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-brand-muted">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
