import { create } from 'zustand';

/** Lightweight Zustand store for ephemeral UI state */
export const useUiStore = create((set) => ({
  headerVisible: true,
  setHeaderVisible: (visible) => set({ headerVisible: visible }),
  lastScrollY: 0,
  setLastScrollY: (y) => set({ lastScrollY: y }),
}));
