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
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <Button
        onClick={() => setOpenTrailer(false)}
        className="absolute top-6 right-6 text-white text-3xl cursor-pointer"
      >
        ✕
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
