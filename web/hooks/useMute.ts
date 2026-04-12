import { useRef, useState } from "react";



export function useMute(initial = true) {
  const [muted, setMuted] = useState(initial);
  const playerRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = () => setMuted((prev) => !prev);

  const forceMute = () => setMuted(true);

  return { playerRef, muted, toggleMute, forceMute };
}
