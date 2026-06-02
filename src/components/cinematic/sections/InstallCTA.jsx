import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone } from 'lucide-react';
import { LOCAL } from '../../../constants/images';
import MagneticButton from '../shared/MagneticButton';

export default function InstallCTA() {
  const [deferred, setDeferred] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
    }
  };

  return (
    <section className="cinematic-section relative overflow-hidden pb-32 md:pb-24">
      <div className="cinematic-container">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="cinematic-eyebrow">Install App</p>
            <h2 className="cinematic-heading">
              DryTuch in your pocket.<br />Native experience.
            </h2>
            <p className="mt-4 max-w-md text-sm text-stone-500">
              Install our PWA for instant access — works on Android & iOS.
              Shop, track orders, and get offers offline-ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton onClick={install} className="px-8 py-4 text-sm">
                <Download size={16} /> Install App
              </MagneticButton>
            </div>
            <div className="mt-6 flex gap-6 text-xs text-stone-400">
              <span>Android</span>
              <span>·</span>
              <span>iOS</span>
              <span>·</span>
              <span>PWA Ready</span>
            </div>
          </div>

          <motion.div
            className="phone-mockup mx-auto"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="phone-frame">
              <div className="phone-notch" />
              <div className="phone-screen">
                <img src={LOCAL.landing} alt="DryTuch App" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <Smartphone size={20} className="mx-auto text-luxury-secondary" />
                  <p className="mt-2 font-display text-sm font-bold">DRYTUCH</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
