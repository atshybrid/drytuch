import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { orderService } from '../api';
import { clearCart, selectCartItems } from '../store/slices/cartSlice';
import { selectUser } from '../store/slices/authSlice';
import { showToast } from '../store/slices/uiSlice';
import { useCartTotals } from '../hooks/useCartTotals';
import { formatPrice } from '../utils/format';
import { PAYMENT_METHODS } from '../constants';
import ProductImage from '../components/ui/ProductImage';
import EmptyState from '../components/ui/EmptyState';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const user = useSelector(selectUser);
  const { subtotal, discount, delivery, total } = useCartTotals();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      line1: '',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const orderId = `ORD-${Date.now()}`;
      await orderService.create({
        id: orderId,
        userId: user?.id || '1',
        items: items.map((i) => ({
          productId: i.id,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        subtotal,
        discount,
        delivery,
        total,
        status: 'confirmed',
        paymentMethod,
        address: data,
        createdAt: new Date().toISOString(),
        tracking: [
          { status: 'confirmed', label: 'Order Confirmed', date: new Date().toISOString(), completed: true },
        ],
      });
      dispatch(clearCart());
      dispatch(showToast('Order placed!'));
      navigate(`/orders/${orderId}/track`);
    } catch {
      dispatch(showToast('Order failed'));
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your bag is empty"
        action={
          <Link to="/categories">
            <Button>Shop now</Button>
          </Link>
        }
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="page-pad pb-12">
      <p className="text-sm text-luxury-muted">Secure checkout</p>

      <section className="mt-5 rounded-2xl card-luxury p-5">
        <h2 className="font-display text-lg font-bold">Delivery address</h2>
        <div className="mt-4 space-y-3">
          <Input {...register('name', { required: true })} placeholder="Full name" />
          <Input {...register('phone', { required: true })} placeholder="Phone" />
          <Input {...register('line1', { required: true })} placeholder="Address" />
          <div className="grid grid-cols-2 gap-3">
            <Input {...register('city', { required: true })} placeholder="City" />
            <Input {...register('pincode', { required: true })} placeholder="Pincode" />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-2xl card-luxury p-5">
        <h2 className="font-display text-lg font-bold">Payment</h2>
        <div className="mt-4 space-y-2">
          {PAYMENT_METHODS.map((pm) => (
            <label
              key={pm.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${
                paymentMethod === pm.id
                  ? 'border-luxury-primary bg-luxury-primary/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <input
                type="radio"
                name="pay"
                checked={paymentMethod === pm.id}
                onChange={() => setPaymentMethod(pm.id)}
                className="accent-[#C0392B]"
              />
              <span className="text-lg">{pm.icon}</span>
              <span className="text-sm font-medium">{pm.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl card-luxury p-5">
        <h2 className="font-display text-lg font-bold">Order summary</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <ProductImage src={item.image} alt="" pad={false} className="h-14 w-14 shrink-0 rounded-xl" imgClassName="p-1" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="text-xs text-luxury-muted">Qty {item.quantity}</p>
              </div>
              <p className="shrink-0 text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
          <div className="flex justify-between text-luxury-muted">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {discount > 0 ? (
            <div className="flex justify-between text-luxury-secondary">
              <span>Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          ) : null}
          <div className="flex justify-between text-luxury-muted">
            <span>Delivery</span>
            <span>{delivery === 0 ? 'FREE' : formatPrice(delivery)}</span>
          </div>
          <div className="flex justify-between font-display text-lg font-bold">
            <span>Total</span>
            <span className="text-luxury-secondary">{formatPrice(total)}</span>
          </div>
        </div>
      </section>

      <Button type="submit" size="lg" className="mt-6 w-full" loading={loading}>
        Place order · {formatPrice(total)}
      </Button>
    </form>
  );
}
