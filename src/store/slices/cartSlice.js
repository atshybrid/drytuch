import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../constants';
import { getStorage, setStorage } from '../../utils/storage';

const loadCart = () => getStorage(STORAGE_KEYS.CART, { items: [], coupon: null });

const saveCart = (state) => {
  setStorage(STORAGE_KEYS.CART, {
    items: state.items,
    coupon: state.coupon,
  });
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart().items || [],
    coupon: loadCart().coupon || null,
  },
  reducers: {
    addToCart: (state, { payload: product }) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveCart(state);
    },
    removeFromCart: (state, { payload: productId }) => {
      state.items = state.items.filter((i) => i.id !== productId);
      saveCart(state);
    },
    updateQuantity: (state, { payload: { productId, quantity } }) => {
      const item = state.items.find((i) => i.id === productId);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
      saveCart(state);
    },
    applyCoupon: (state, { payload: coupon }) => {
      state.coupon = coupon;
      saveCart(state);
    },
    clearCoupon: (state) => {
      state.coupon = null;
      saveCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      saveCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  clearCoupon,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCoupon = (state) => state.cart.coupon;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export default cartSlice.reducer;
