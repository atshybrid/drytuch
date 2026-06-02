import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle } from 'lucide-react';

const steps = [
  { icon: Package, label: 'Order placed', desc: 'Instant confirmation' },
  { icon: Truck, label: 'Packed fresh', desc: 'Quality checked' },
  { icon: CheckCircle, label: 'Delivered', desc: 'To your door' },
];

export default function OrderJourney() {
  return (
    <section className="px-4 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-luxury-secondary">
        Journey
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold">Farm to doorstep.</h2>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:gap-6">
        {steps.map(({ icon: Icon, label, desc }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-1 items-center gap-4 rounded-3xl card-luxury p-5"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-luxury-secondary/15 text-luxury-secondary">
              <Icon size={26} />
            </div>
            <div>
              <p className="font-display font-bold">{label}</p>
              <p className="text-sm text-luxury-muted">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
