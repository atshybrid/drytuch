import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DELIVERY_FEE, FREE_DELIVERY_MIN } from '../constants';
import { selectCartItems, selectCartCoupon } from '../store/slices/cartSlice';

/** Compute cart price summary including coupon and delivery */
export function useCartTotals() {
  const items = useSelector(selectCartItems);
  const coupon = useSelector((s) => s.cart.coupon);

  return useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discount = coupon?.discountAmount || 0;
    const afterDiscount = Math.max(0, subtotal - discount);
    const delivery =
      afterDiscount >= FREE_DELIVERY_MIN || afterDiscount === 0
        ? 0
        : DELIVERY_FEE;
    const total = afterDiscount + delivery;
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    return { subtotal, discount, delivery, total, itemCount, coupon };
  }, [items, coupon]);
}
