import { create } from "zustand";

// Types
import { AudioState } from "@/types/store";


export const useAudioStore = create<AudioState>((set) => ({
  activeVideoId: null,
  setActiveVideoId: (id) => set({ activeVideoId: id }),
}));