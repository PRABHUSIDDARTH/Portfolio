import { create } from 'zustand';

interface PortfolioState {
  // Loading
  loadingProgress: number;
  isLoaded: boolean;
  // Camera / scroll
  scrollProgress: number;
  activeSection: number;
  // Features
  reducedMotion: boolean;
  audioEnabled: boolean;
  liteMode: boolean;
  sceneEnabled: boolean;
  // Cursor
  cursorLabel: string;
  isMagnetic: boolean;
  // Actions
  setLoadingProgress: (p: number) => void;
  setLoaded: () => void;
  setScrollProgress: (p: number) => void;
  setActiveSection: (s: number) => void;
  setAudioEnabled: (v: boolean) => void;
  setLiteMode: (v: boolean) => void;
  setSceneEnabled: (v: boolean) => void;
  setCursorLabel: (l: string) => void;
  setMagnetic: (m: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  loadingProgress: 0,
  isLoaded: false,
  scrollProgress: 0,
  activeSection: 0,
  reducedMotion: typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false,
  audioEnabled: false,
  liteMode: false,
  sceneEnabled: true,
  cursorLabel: '',
  isMagnetic: false,

  setLoadingProgress: (p) => set({ loadingProgress: Math.min(100, p) }),
  setLoaded: () => set({ isLoaded: true, loadingProgress: 100 }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setActiveSection: (s) => set({ activeSection: s }),
  setAudioEnabled: (v) => set({ audioEnabled: v }),
  setLiteMode: (v) => set({ liteMode: v }),
  setSceneEnabled: (v) => set({ sceneEnabled: v }),
  setCursorLabel: (l) => set({ cursorLabel: l }),
  setMagnetic: (m) => set({ isMagnetic: m }),
}));
