import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../constants';
import { getStorage, setStorage } from '../../utils/storage';

const loadWishlist = () => getStorage(STORAGE_KEYS.WISHLIST, []);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: loadWishlist() },
  reducers: {
    toggleWishlist: (state, { payload: product }) => {
      const idx = state.items.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(product);
      }
      setStorage(STORAGE_KEYS.WISHLIST, state.items);
    },
    removeFromWishlist: (state, { payload: productId }) => {
      state.items = state.items.filter((i) => i.id !== productId);
      setStorage(STORAGE_KEYS.WISHLIST, state.items);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export const selectWishlist = (state) => state.wishlist.items;
export const selectIsInWishlist = (productId) => (state) =>
  state.wishlist.items.some((i) => String(i.id) === String(productId));

export default wishlistSlice.reducer;
