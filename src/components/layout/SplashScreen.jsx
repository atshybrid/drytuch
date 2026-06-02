import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import { setSplashDone } from '../../store/slices/uiSlice';
import { STORAGE_KEYS } from '../../constants';
import { setStorage } from '../../utils/storage';
import { LOCAL } from '../../constants/images';

export default function SplashScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    gsap.from('.splash-logo', { scale: 0.9, opacity: 0, duration: 0.5, ease: 'power2.out' });
    gsap.from('.splash-tag', { y: 12, opacity: 0, duration: 0.35, delay: 0.2 });

    const t = setTimeout(() => {
      setStorage(STORAGE_KEYS.SPLASH_SEEN, true);
      dispatch(setSplashDone());
      navigate('/', { replace: true });
    }, 1800);
    return () => clearTimeout(t);
  }, [navigate, dispatch]);

  return (
    <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-luxury-bg">
      <img
        src={LOCAL.landing}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-white/80" />
      <motion.img
        src={LOCAL.logo}
        alt="DryTuch"
        className="splash-logo relative z-10 w-36"
      />
      <p className="splash-tag relative z-10 mt-5 font-display text-lg font-bold tracking-[0.25em] text-luxury-primary">
        PREMIUM DRY FOODS
      </p>
    </div>
  );
}
