import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    splashDone: false,
    searchOpen: false,
    toast: null,
  },
  reducers: {
    setSplashDone: (state) => {
      state.splashDone = true;
    },
    setSearchOpen: (state, { payload }) => {
      state.searchOpen = payload;
    },
    showToast: (state, { payload }) => {
      state.toast = payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
  },
});

export const { setSplashDone, setSearchOpen, showToast, hideToast } =
  uiSlice.actions;

export default uiSlice.reducer;
