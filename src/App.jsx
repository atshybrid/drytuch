import { useEffect } from 'react';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppRoutes from './routes';
import { getStorage } from './utils/storage';
import { STORAGE_KEYS } from './constants';

/** Redirect first-time visitors to splash screen */
function SplashRedirect({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const seen = getStorage(STORAGE_KEYS.SPLASH_SEEN, false);
    if (!seen && location.pathname !== '/splash') {
      navigate('/splash', { replace: true });
    }
  }, [navigate, location.pathname]);

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <SplashRedirect>
        <AnimatePresence mode="wait">
          <AppRoutes />
        </AnimatePresence>
      </SplashRedirect>
    </BrowserRouter>
  );
}
