import ReactPlayer from "react-player";
import { Volume2, VolumeOff } from "lucide-react";

export function MovieCardPlayer({
  trailerKey,
  isActive,
  toggleActive,
}: {
  trailerKey: string;
  isActive: boolean;
  toggleActive: () => void;
}) {
  return (
    <div className="absolute inset-0 z-20 bg-black">
      <ReactPlayer
        src={`https://www.youtube.com/watch?v=${trailerKey}`}
        playing
        muted={!isActive}
        width="100%"
        height="100%"
        controls={false}
      />
      <div
        className="cursor-pointer bg-black/50 p-1 rounded-full absolute bottom-4 left-4 text-white z-21"
        onClick={toggleActive}
      >
        {isActive ? <Volume2 /> : <VolumeOff />}
      </div>
    </div>
  );
}