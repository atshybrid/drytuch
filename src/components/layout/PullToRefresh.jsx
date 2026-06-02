import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { usePullToRefresh } from '../../hooks/usePullToRefresh';

export default function PullToRefresh({ onRefresh, children, className = '' }) {
  const { pulling, refreshing, handlers } = usePullToRefresh(onRefresh);

  return (
    <div className={`relative ${className}`} {...handlers}>
      <AnimatePresence>
        {(pulling || refreshing) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 48 }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-center gap-2 text-sm font-medium text-primary"
          >
            <Loader2
              size={18}
              className={refreshing ? 'animate-spin' : ''}
            />
            {refreshing ? 'Refreshing...' : 'Release to refresh'}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
