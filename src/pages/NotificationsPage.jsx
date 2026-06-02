import { useQuery } from '@tanstack/react-query';
import { miscService } from '../api';
import { formatDate } from '../utils/format';
import Loading from '../components/ui/Loading';
import EmptyState from '../components/ui/EmptyState';

export default function NotificationsPage() {
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => miscService.getNotifications('1'),
  });

  if (isLoading) return <Loading />;

  if (notifications.length === 0) {
    return <EmptyState icon="🔔" title="No notifications" description="You're all caught up" />;
  }

  return (
    <div className="page-pad">
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`rounded-2xl p-4 ${
              n.read ? 'card-luxury' : 'border border-luxury-primary/25 bg-luxury-primary/5'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold">{n.title}</h3>
              {!n.read ? <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-luxury-primary" /> : null}
            </div>
            <p className="mt-1 text-sm text-luxury-muted">{n.message}</p>
            <p className="mt-2 text-xs text-luxury-muted">{formatDate(n.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
