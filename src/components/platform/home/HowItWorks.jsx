import { motion } from 'framer-motion';
import { LOCAL } from '../../../constants/images';

export default function HowItWorks() {
  return (
    <section className="section-pad bg-stone-50">
      <div className="container-brand">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How It Works</p>
          <h2 className="heading-lg mt-2">Farm to your door</h2>
          <p className="mt-3 text-brand-muted">
            From fresh farms to your table — five steps of care, quality, and global delivery.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-brand-border bg-white p-2 shadow-lg sm:p-4"
        >
          <img
            src={LOCAL.flow}
            alt="DRYTUCH process: Fresh Selection, Natural Drying, Quality Inspection, Vacuum Packaging, and Delivery"
            className="h-auto w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
}
