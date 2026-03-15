import ReactPlayer from "react-player";

// UI
import { Button } from "@/components/ui/button";


export function HeroTrailerModal({ videoKey, setOpenTrailer }: { videoKey: string; setOpenTrailer: any }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <Button
        onClick={() => setOpenTrailer(false)}
        className="absolute top-6 right-6 text-white text-3xl cursor-pointer"
      >
        ✕
      </Button>

      <div className="w-[90vw] h-[80vh]">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${videoKey}`}
          playing
          controls
          muted
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
