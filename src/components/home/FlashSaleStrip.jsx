import { Link } from 'react-router-dom';
import { Timer, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FlashSaleStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className="mx-4 mt-6"
    >
      <Link
        to="/offers"
        className="flex items-center gap-4 overflow-hidden rounded-2xl bg-ink p-4 text-white"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-ink">
          <Zap size={24} fill="currentColor" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-base font-bold">Flash Sale Live</p>
          <p className="text-xs text-white/60">Up to 25% off · Ends tonight</p>
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold">
          <Timer size={14} className="animate-pulse-soft" />
          04:22:18
        </div>
      </Link>
    </motion.div>
  );
}
