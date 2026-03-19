export interface AudioState {
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
}

export interface ThemeState {
  theme: 'system' | 'light' | 'dark';
  setTheme: (theme: 'system' | 'light' | 'dark') => void;
}