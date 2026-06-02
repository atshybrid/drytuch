import { useQuery } from '@tanstack/react-query';
import { Copy } from 'lucide-react';
import { miscService } from '../api';
import { useDispatch } from 'react-redux';
import { showToast } from '../store/slices/uiSlice';
import Loading from '../components/ui/Loading';
import ProductImage from '../components/ui/ProductImage';

export default function OffersPage() {
  const dispatch = useDispatch();
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ['offers'],
    queryFn: miscService.getOffers,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="page-pad">
      <p className="text-sm text-luxury-muted">Exclusive deals for you</p>

      <div className="mt-4 space-y-4">
        {offers.map((offer) => (
          <div key={offer.id} className="overflow-hidden rounded-2xl card-luxury">
            <ProductImage src={offer.image} alt="" className="h-32 w-full sm:h-36" />
            <div className="p-4">
              <h2 className="font-display text-lg font-bold">{offer.title}</h2>
              <p className="mt-1 text-sm text-luxury-muted">{offer.subtitle}</p>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(offer.code);
                  dispatch(showToast(`Code ${offer.code} copied!`));
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-luxury-primary/40 bg-luxury-primary/5 py-2.5 font-mono text-sm font-bold text-luxury-primary"
              >
                {offer.code}
                <Copy size={14} />
              </button>
              <p className="mt-2 text-xs text-luxury-muted">
                Valid till {new Date(offer.expiresAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
