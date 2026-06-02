import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ALL_DRY_ITEMS } from '../../constants/images';
import ProductImage from '../ui/ProductImage';

export default function DryItemsGallery() {
  return (
    <section className="page-pad">
      <div className="mb-5">
        <p className="section-eyebrow">Our collection</p>
        <h2 className="section-title">All Dry Items</h2>
        <p className="mt-1 text-sm text-luxury-muted">Every product, one place</p>
      </div>
      <div className="product-grid">
        {ALL_DRY_ITEMS.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.03, 0.4) }}
          >
            <Link
              to={`/categories/${item.category}`}
              className="group block overflow-hidden rounded-2xl card-luxury-hover"
            >
              <div className="aspect-square overflow-hidden bg-luxury-surface">
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="p-2.5 text-center text-xs font-semibold text-white/85">{item.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
