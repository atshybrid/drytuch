import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { MapPin } from 'lucide-react';
import { miscService } from '../api';
import { selectUser } from '../store/slices/authSlice';
import Loading from '../components/ui/Loading';
import Badge from '../components/ui/Badge';

export default function AddressesPage() {
  const user = useSelector(selectUser);

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ['addresses', user?.id || '1'],
    queryFn: () => miscService.getAddresses(user?.id || '1'),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="page-pad">
      <p className="text-sm text-luxury-muted">{addresses.length} saved addresses</p>

      <div className="mt-4 space-y-3">
        {addresses.map((addr) => (
          <div key={addr.id} className="rounded-2xl card-luxury p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-luxury-secondary">
                <MapPin size={16} />
              </span>
              <div>
                {addr.isDefault ? (
                  <Badge color="secondary" className="mb-2">Default</Badge>
                ) : null}
                <p className="font-semibold">{addr.name}</p>
                <p className="mt-1 text-sm text-luxury-muted">
                  {addr.line1}, {addr.line2}
                  <br />
                  {addr.city}, {addr.state} — {addr.pincode}
                </p>
                <p className="mt-1 text-sm text-luxury-muted">{addr.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
