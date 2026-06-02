import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { productService } from '../../../api';
import ProductCard from '../product/ProductCard';

export default function BestSellersHome() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', 'home-bestsellers'],
    queryFn: productService.getHomeBestSellers,
  });

  return (
    <section className="section-pad bg-white">
      <div className="container-brand">
        <p className="eyebrow">Best Sellers</p>
        <h2 className="heading-lg mt-2">Customer favourites</h2>
        <p className="mt-2 text-brand-muted">Curated picks — no overwhelm, just quality.</p>

        {isLoading ? (
          <div className="product-grid mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] shimmer rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="product-grid mt-8">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
