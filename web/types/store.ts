export interface AudioState {
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
}
