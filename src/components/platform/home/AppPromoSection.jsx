import { Smartphone, Download } from 'lucide-react';

export default function AppPromoSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-brand">
        <div className="flex flex-col items-center gap-8 rounded-3xl bg-stone-900 px-6 py-12 text-center text-white md:flex-row md:text-left">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Mobile App</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Install DRYTUCH App</h2>
            <p className="mt-3 max-w-md text-stone-300">
              Native app experience on Android & iOS. PWA ready — shop, track orders, get offers.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <button type="button" className="btn-brand bg-white text-stone-900 hover:opacity-90">
                <Download size={16} /> Install App
              </button>
            </div>
            <p className="mt-4 text-xs text-stone-500">Android · iOS · PWA</p>
          </div>
          <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white/10">
            <Smartphone size={48} className="text-white/80" />
          </div>
        </div>
      </div>
    </section>
  );
}
