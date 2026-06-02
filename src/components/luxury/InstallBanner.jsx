import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

export default function InstallBanner() {
  const [show, setShow] = useState(false);
  const [deferred, setDeferred] = useState(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('drytuch_install_dismissed');
    if (dismissed) return;

    const handler = (e) => {
      e.preventDefault();
      setDeferred(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    const t = setTimeout(() => {
      if (!sessionStorage.getItem('drytuch_install_dismissed')) {
        setShow(true);
      }
    }, 4000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(t);
    };
  }, []);

  const install = async () => {
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
    }
    setShow(false);
    sessionStorage.setItem('drytuch_install_dismissed', '1');
  };

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('drytuch_install_dismissed', '1');
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-[calc(var(--nav-h)+env(safe-area-inset-bottom,0px)+0.5rem)] left-4 right-4 z-[60] md:bottom-6 md:left-auto md:right-8 md:max-w-sm"
        >
          <div className="flex items-center gap-3 rounded-2xl glass-luxury p-4 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-luxury-primary">
              <Download size={22} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold">Install DryTuch</p>
              <p className="text-xs text-luxury-muted">Native app experience on your phone</p>
            </div>
            <button type="button" onClick={install} className="btn-luxury px-4 py-2 text-xs text-white">
              Install
            </button>
            <button type="button" onClick={dismiss} className="text-white/50" aria-label="Dismiss">
              <X size={18} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
