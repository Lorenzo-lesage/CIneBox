import ReactPlayer from "react-player";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";

// Hooks
import { useIsMobile } from "@/hooks/useIsMobile";

// UI
import { Button } from "@/components/ui/button";

// Icons
import { CircleX } from "lucide-react";

// Types
import { HeroTrailerModalProps } from "@/types/components";

export function HeroTrailerModal({
  videoKey,
  setOpenTrailer,
}: HeroTrailerModalProps) {
  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const isMobile = useIsMobile();

  /*
  |--------------------------------------------------------------------------
  | return
  |--------------------------------------------------------------------------
  */

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
      <Button
        onClick={() => setOpenTrailer(false)}
        className="absolute top-6 right-6 text-primary cursor-pointer bg-transparent hover:bg-secondary w-12 h-12 rounded-full flex items-center justify-cente"
      >
        <CircleX className="!w-8 !h-8" />
      </Button>

      <MediaController
        style={{
          aspectRatio: "16/9",
          width: isMobile ? "100%" : "90%",
        }}
      >
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${videoKey}`}
          slot="media"
          controls={false}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <MediaControlBar>
          <MediaPlayButton />
          <MediaSeekBackwardButton seekOffset={10} />
          <MediaSeekForwardButton seekOffset={10} />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaMuteButton />
          <MediaVolumeRange />
          <MediaPlaybackRateButton />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
}
