import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
import { ThemeState } from '@/types/store';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'theme-storage' }
    
  )
);