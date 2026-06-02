import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../store/slices/uiSlice';

export default function Toast() {
  const toast = useSelector((s) => s.ui.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch(hideToast()), 2800);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-[calc(var(--nav-h)+env(safe-area-inset-bottom,0px)+0.5rem)] left-4 right-4 z-[200] mx-auto max-w-sm rounded-xl glass-luxury px-4 py-3 text-center text-sm font-semibold md:bottom-8"
        >
          {toast}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
