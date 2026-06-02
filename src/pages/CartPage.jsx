import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, Trash2, Tag } from 'lucide-react';
import {
  removeFromCart,
  updateQuantity,
  applyCoupon,
  clearCoupon,
  selectCartItems,
} from '../store/slices/cartSlice';
import { showToast } from '../store/slices/uiSlice';
import { couponService } from '../api';
import { useCartTotals } from '../hooks/useCartTotals';
import { formatPrice } from '../utils/format';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Input from '../components/ui/Input';
import ProductImage from '../components/ui/ProductImage';
import { useState } from 'react';

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { subtotal, discount, delivery, total } = useCartTotals();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = async () => {
    try {
      setCouponError('');
      const { coupon, discount: discountAmount } = await couponService.validate(
        couponCode,
        subtotal
      );
      dispatch(
        applyCoupon({
          code: coupon.code,
          discountAmount,
          description: coupon.description,
        })
      );
      dispatch(showToast('Coupon applied!'));
    } catch (e) {
      setCouponError(e.message);
    }
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        description="Add some delicious dried goodies!"
        action={
          <Link to="/categories">
            <Button>Start Shopping</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="page-pad pb-40">
      <p className="text-sm text-luxury-muted">{items.length} items in cart</p>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-2xl card-luxury p-3">
            <ProductImage
              src={item.image}
              alt={item.title}
              pad={false}
              className="h-20 w-20 shrink-0 rounded-xl"
              imgClassName="p-1.5"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="truncate font-semibold">{item.title}</h3>
              <p className="font-display font-bold text-luxury-secondary">
                {formatPrice(item.price)}
              </p>
              <div className="mt-auto flex items-center justify-between gap-2">
                <div className="flex items-center rounded-lg bg-white/5">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(updateQuantity({ productId: item.id, quantity: item.quantity - 1 }))
                    }
                    className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="min-w-[1.5rem] text-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(updateQuantity({ productId: item.id, quantity: item.quantity + 1 }))
                    }
                    className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="flex items-center gap-1 text-xs text-red-400"
                >
                  <Trash2 size={13} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl card-luxury p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <Tag size={16} className="text-luxury-secondary" />
          Coupon Code
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. DRYTUCH10"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            error={couponError}
            className="flex-1"
          />
          <Button size="md" onClick={handleApplyCoupon}>
            Apply
          </Button>
        </div>
        {discount > 0 ? (
          <button
            type="button"
            onClick={() => dispatch(clearCoupon())}
            className="mt-2 text-xs text-red-400"
          >
            Remove coupon
          </button>
        ) : null}
      </div>

      <div className="mt-4 rounded-2xl card-luxury p-4">
        <div className="space-y-2 text-sm">
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
          <div className="flex justify-between border-t border-white/10 pt-3 font-display text-lg font-bold">
            <span>Total</span>
            <span className="text-luxury-secondary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="fixed-bar">
        <div className="mx-auto max-w-lg">
          <Link to="/checkout">
            <Button size="lg" className="w-full">
              Checkout · {formatPrice(total)}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
