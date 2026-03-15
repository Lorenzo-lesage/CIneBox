import { useRef, useState } from "react";
import ReactPlayer from "react-player";

export function useMute(initial = true) {
  const [muted, setMuted] = useState(initial);
  const playerRef = useRef<ReactPlayer>(null);

  const toggleMute = () => setMuted((prev) => !prev);

  const forceMute = () => setMuted(true);

  return { playerRef, muted, toggleMute, forceMute };
}