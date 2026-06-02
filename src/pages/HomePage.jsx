import HeroHome from '../components/platform/home/HeroHome';
import StatsStrip from '../components/platform/home/StatsStrip';
import CategoryShowcase from '../components/platform/home/CategoryShowcase';
import BestSellersHome from '../components/platform/home/BestSellersHome';
import HowItWorks from '../components/platform/home/HowItWorks';
import WhySection from '../components/platform/home/WhySection';
import TestimonialsSection from '../components/platform/home/TestimonialsSection';
import AppPromoSection from '../components/platform/home/AppPromoSection';
import PlatformFooter from '../components/platform/layout/PlatformFooter';

export default function HomePage() {
  return (
    <div className="bg-brand-bg">
      <HeroHome />
      <StatsStrip />
      <CategoryShowcase />
      <BestSellersHome />
      <HowItWorks />
      <WhySection />
      <TestimonialsSection />
      <AppPromoSection />
      <PlatformFooter />
    </div>
  );
}
