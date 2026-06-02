/** Brand and app-wide constants */
export const BRAND = {
  name: 'DryTuch',
  domain: 'DryTuch.com',
  tagline: 'Natural • Healthy • Premium',
  colors: {
    primary: '#7A2E0B',
    secondary: '#4D7C0F',
    accent: '#EAB308',
    background: '#F8F7F3',
  },
};

export const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const STORAGE_KEYS = {
  SPLASH_SEEN: 'drytuch_splash_seen',
  AUTH_TOKEN: 'drytuch_auth',
  CART: 'drytuch_cart',
  WISHLIST: 'drytuch_wishlist',
};

export const ORDER_STATUS = [
  { key: 'confirmed', label: 'Order Confirmed' },
  { key: 'packed', label: 'Packed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
];

export const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { id: 'razorpay', label: 'Razorpay', icon: '💳' },
  { id: 'upi', label: 'UPI', icon: '📱' },
];

export const DELIVERY_FEE = 49;
export const FREE_DELIVERY_MIN = 499;
