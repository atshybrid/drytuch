import { motion } from 'framer-motion';
import { Leaf, Shield, Dumbbell, Tractor } from 'lucide-react';

const items = [
  { icon: Leaf, title: '100% Natural', desc: 'No artificial colours or flavours' },
  { icon: Shield, title: 'No Preservatives', desc: 'Clean label you can trust' },
  { icon: Dumbbell, title: 'Protein Rich', desc: 'Fuel for active lifestyles' },
  { icon: Tractor, title: 'Farm Direct', desc: 'Sourced from trusted growers' },
];

export default function WhyDryTuch() {
  return (
    <section className="page-pad">
      <p className="section-eyebrow">Why DryTuch</p>
      <h2 className="section-title">Built different.</h2>

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl card-luxury p-4 md:p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-luxury-primary/15 text-luxury-primary">
              <Icon size={20} />
            </div>
            <h3 className="mt-3 font-display text-sm font-bold md:text-base">{title}</h3>
            <p className="mt-1 text-xs text-luxury-muted md:text-sm">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
