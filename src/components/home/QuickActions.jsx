import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Gift, Star } from 'lucide-react';

const actions = [
  { to: '/offers', label: 'Deals', icon: Flame, bg: 'bg-red-50', color: 'text-red-600' },
  { to: '/categories/dry-meat', label: 'Jerky', icon: TrendingUp, bg: 'bg-orange-50', color: 'text-primary' },
  { to: '/categories/dry-fruits', label: 'Fruits', icon: Gift, bg: 'bg-amber-50', color: 'text-amber-700' },
  { to: '/categories/nuts', label: 'Nuts', icon: Star, bg: 'bg-green-50', color: 'text-secondary' },
];

export default function QuickActions() {
  return (
    <div className="mt-5 grid grid-cols-4 gap-2 px-4">
      {actions.map(({ to, label, icon: Icon, bg, color }, i) => (
        <motion.div
          key={to}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
        >
          <Link
            to={to}
            className="flex flex-col items-center gap-2 rounded-2xl bg-surface p-3 shadow-sm transition active:scale-95"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
              <Icon size={22} className={color} />
            </div>
            <span className="text-[11px] font-semibold text-stone-700">{label}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
