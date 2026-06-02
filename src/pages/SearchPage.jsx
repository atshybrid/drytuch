import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { productService } from '../api';
import ProductCardCompact from '../components/product/ProductCardCompact';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const { data: results = [], isFetching } = useQuery({
    queryKey: ['search', query],
    queryFn: () => productService.search(query),
    enabled: query.length >= 2,
  });

  return (
    <div className="page-pad">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-muted" size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dry meat, dates, vegetables..."
          autoFocus
          className="input-field py-3.5 pl-11"
        />
      </div>

      {query.length < 2 ? (
        <EmptyState icon="🔍" title="Search DryTuch" description="Find premium dry foods" />
      ) : isFetching ? (
        <div className="product-grid mt-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-[3/4]" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <EmptyState icon="😕" title="No results" description={`Nothing for "${query}"`} />
      ) : (
        <>
          <p className="mt-4 text-sm text-luxury-muted">{results.length} results</p>
          <div className="product-grid mt-4">
            {results.map((p, i) => (
              <ProductCardCompact key={p.id} product={p} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
