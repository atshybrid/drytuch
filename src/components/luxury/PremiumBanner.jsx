import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductImage from '../ui/ProductImage';

export default function PremiumBanner({ title, subtitle, cta, link, image }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="page-pad"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/7] min-h-[160px] sm:aspect-[21/9] sm:min-h-[200px]">
          <ProductImage src={image} alt={title} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-center p-5 sm:p-8 md:p-10">
            <p className="section-eyebrow">{subtitle}</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
            <Link
              to={link || '/categories'}
              className="btn-luxury mt-4 w-fit px-6 py-2.5 text-sm text-white sm:mt-5"
            >
              {cta || 'Shop Now'}
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
