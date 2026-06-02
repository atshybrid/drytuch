import axiosClient from '../axiosClient';

export const couponService = {
  getAll: () => axiosClient.get('/coupons').then((r) => r.data),

  validate: async (code, subtotal, categoryId = null) => {
    const coupons = await axiosClient.get('/coupons').then((r) => r.data);
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase()
    );
    if (!coupon) throw new Error('Invalid coupon code');
    if (subtotal < coupon.minOrder)
      throw new Error(`Minimum order ₹${coupon.minOrder} required`);
    if (coupon.categoryId && coupon.categoryId !== categoryId)
      throw new Error('Coupon not valid for these items');

    const discount =
      coupon.type === 'percent'
        ? Math.round((subtotal * coupon.discount) / 100)
        : coupon.discount;

    return { coupon, discount };
  },
};
