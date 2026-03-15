import { create } from "zustand";

interface AudioState {
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
}


export const useAudioStore = create<AudioState>((set) => ({
  activeVideoId: null,
  setActiveVideoId: (id) => set({ activeVideoId: id }),
}));