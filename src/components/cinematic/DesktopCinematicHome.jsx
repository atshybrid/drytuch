import { CinematicNav } from './shared/MagneticButton';
import HeroSection from './sections/HeroSection';
import JourneySection from './sections/JourneySection';
import ProcessTimeline from './sections/ProcessTimeline';
import MeatStory from './sections/MeatStory';
import VegetablesStory from './sections/VegetablesStory';
import FruitsStory from './sections/FruitsStory';
import WhyCounters from './sections/WhyCounters';
import BestSellersShowcase from './sections/BestSellersShowcase';
import CustomerStories from './sections/CustomerStories';
import InstallCTA from './sections/InstallCTA';

export default function DesktopCinematicHome() {
  return (
    <div className="cinematic-page">
      <CinematicNav />
      <HeroSection />
      <JourneySection />
      <ProcessTimeline />
      <MeatStory />
      <VegetablesStory />
      <FruitsStory />
      <WhyCounters />
      <BestSellersShowcase />
      <CustomerStories />
      <InstallCTA />
      <footer className="border-t border-stone-200 py-12 text-center">
        <p className="font-display text-lg font-extrabold text-stone-900">
          <span className="text-luxury-primary">DRY</span>TUCH
        </p>
        <p className="mt-2 text-xs text-stone-400">
          © {new Date().getFullYear()} · Natural · Healthy · Premium
        </p>
      </footer>
    </div>
  );
}
