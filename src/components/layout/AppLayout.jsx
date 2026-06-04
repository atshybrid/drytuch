import { Outlet } from 'react-router-dom';
import PremiumHeader from '../platform/layout/PremiumHeader';
import MobileHeader from '../platform/layout/MobileHeader';
import BottomNav from './BottomNav';
import Toast from '../ui/Toast';
import RouteSeo from '../seo/RouteSeo';

export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-brand-bg">
      <RouteSeo />
      <PremiumHeader />
      <MobileHeader />
      <main className="pb-nav md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
      <Toast />
    </div>
  );
}
