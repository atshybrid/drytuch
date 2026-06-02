import { FAQ_ITEMS } from '../constants/brand';

export default function FAQPage() {
  return (
    <div className="page-wrap pb-nav md:pb-10">
      <p className="eyebrow">Help Center</p>
      <h1 className="heading-xl mt-2">Frequently Asked Questions</h1>
      <p className="mt-2 text-brand-muted">Quick answers for international customers.</p>

      <div className="mt-8 space-y-3">
        {FAQ_ITEMS.map((item) => (
          <details key={item.q} className="glass-card group p-5">
            <summary className="cursor-pointer list-none font-display font-bold marker:content-none">
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
