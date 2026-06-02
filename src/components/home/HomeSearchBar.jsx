import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeSearchBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="px-4 md:px-0"
    >
      <Link
        to="/search"
        className="flex items-center gap-3 rounded-2xl surface-elevated px-4 py-3.5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-muted">Search DryTuch</p>
          <p className="text-sm font-medium text-ink/80">Jerky, dates, almonds...</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-stone-50">
          <SlidersHorizontal size={18} className="text-muted" />
        </div>
      </Link>
    </motion.div>
  );
}
