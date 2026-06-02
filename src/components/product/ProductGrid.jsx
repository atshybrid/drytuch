import ProductCard from './ProductCard';

export default function ProductGrid({ products, horizontal = false }) {
  if (horizontal) {
    return (
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar snap-x snap-mandatory">
        {products.map((p, i) => (
          <div key={p.id} className="snap-start">
            <ProductCard product={p} compact index={i} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
