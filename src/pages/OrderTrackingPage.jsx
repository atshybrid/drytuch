import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { orderService } from '../api';
import { ORDER_STATUS } from '../constants';
import { formatDate } from '../utils/format';
import Loading from '../components/ui/Loading';
import Badge from '../components/ui/Badge';

export default function OrderTrackingPage() {
  const { orderId } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getById(orderId),
  });

  if (isLoading) return <Loading />;
  if (!order) return <p className="page-pad text-luxury-muted">Order not found</p>;

  const tracking = order.tracking || ORDER_STATUS.map((s) => ({
    status: s.key,
    label: s.label,
    completed: false,
    date: null,
  }));

  return (
    <div className="page-pad">
      <Badge color="primary">{order.status}</Badge>
      <p className="mt-2 font-mono text-sm text-luxury-muted">{order.id}</p>

      <div className="mt-8">
        {tracking.map((step, i) => (
          <div key={step.status} className="flex gap-4">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                  step.completed
                    ? 'bg-luxury-secondary text-black'
                    : 'bg-white/10 text-luxury-muted'
                }`}
              >
                {step.completed ? <Check size={16} /> : i + 1}
              </motion.div>
              {i < tracking.length - 1 ? (
                <div
                  className={`my-1 h-10 w-0.5 ${
                    step.completed ? 'bg-luxury-secondary/60' : 'bg-white/10'
                  }`}
                />
              ) : null}
            </div>
            <div className="pb-6">
              <p className={`font-semibold ${step.completed ? 'text-white' : 'text-luxury-muted'}`}>
                {step.label}
              </p>
              {step.date ? (
                <p className="text-xs text-luxury-muted">{formatDate(step.date)}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
