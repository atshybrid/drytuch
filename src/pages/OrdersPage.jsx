import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';
import { orderService } from '../api';
import { selectUser } from '../store/slices/authSlice';
import { formatPrice, formatDate } from '../utils/format';
import Loading from '../components/ui/Loading';
import EmptyState from '../components/ui/EmptyState';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function OrdersPage() {
  const user = useSelector(selectUser);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.id || '1'],
    queryFn: () => orderService.getByUser(user?.id || '1'),
  });

  if (isLoading) return <Loading />;

  if (orders.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="No orders yet"
        description="Your order history will appear here"
        action={
          <Link to="/categories">
            <Button>Start Shopping</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="page-pad">
      <p className="text-sm text-luxury-muted">{orders.length} orders</p>

      <div className="mt-4 space-y-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}/track`}
            className="block rounded-2xl card-luxury-hover p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-bold">{order.id}</span>
              <Badge color={order.status === 'delivered' ? 'success' : 'primary'}>
                {order.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-luxury-muted">
              {formatDate(order.createdAt)} · {order.items?.length} items
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
                {order.items?.map((item, i) => (
                  <img
                    key={i}
                    src={item.image}
                    alt=""
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 pl-2 font-display font-bold text-luxury-secondary">
                {formatPrice(order.total)}
                <ChevronRight size={14} className="text-luxury-muted" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
