import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../constants';
import { getStorage, setStorage, removeStorage } from '../../utils/storage';

const loadAuth = () => getStorage(STORAGE_KEYS.AUTH_TOKEN, null);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadAuth()?.user || null,
    token: loadAuth()?.token || null,
    isAuthenticated: !!loadAuth()?.token,
  },
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      setStorage(STORAGE_KEYS.AUTH_TOKEN, { user, token });
    },
    updateUser: (state, { payload: user }) => {
      state.user = { ...state.user, ...user };
      setStorage(STORAGE_KEYS.AUTH_TOKEN, {
        user: state.user,
        token: state.token,
      });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeStorage(STORAGE_KEYS.AUTH_TOKEN);
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
