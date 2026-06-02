import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Leaf } from 'lucide-react';

const items = [
  { icon: Truck, text: 'Free delivery ₹499+' },
  { icon: ShieldCheck, text: '100% Quality' },
  { icon: Leaf, text: 'No preservatives' },
];

export default function PromoStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mx-4 mt-4 flex gap-2 overflow-x-auto hide-scrollbar"
    >
      {items.map(({ icon: Icon, text }) => (
        <div
          key={text}
          className="flex shrink-0 items-center gap-2 rounded-full border border-stone-200/80 bg-surface px-3 py-2 shadow-sm"
        >
          <Icon size={14} className="text-secondary" />
          <span className="whitespace-nowrap text-xs font-semibold text-stone-700">
            {text}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
