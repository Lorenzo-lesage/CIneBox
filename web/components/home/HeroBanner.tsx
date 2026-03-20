"use client";

import Image from "next/image";
import ReactPlayer from "react-player";

// Store
import { useAudioStore } from "@/store/audioStore";

// UI
import { Button } from "@/components/ui/button";

// Icons
import { Volume2, VolumeOff, Expand } from "lucide-react";

// Types
import { HeroBannerProps } from "@/types/components";

export function HeroBanner({
  movie,
  trailerKey,
  setOpenTrailer,
}: HeroBannerProps) {

  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const { activeVideoId, setActiveVideoId } = useAudioStore();
  const heroId = `hero-${movie.id}`;
  const isActive = activeVideoId === heroId;

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  */

  /**
   * Function to handle open trailer
   */
  const handleOpenTrailer = () => {
    setOpenTrailer(true);
    setActiveVideoId(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Desktop video */}
        {trailerKey ? (
          <>
            <div className=" w-full h-full">
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${trailerKey}`}
                playing
                muted={!isActive}
                loop
                width="100%"
                height="100%"
                className="md:scale-140 scale-250"
                controls={false}
              />
            </div>
          </>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title || movie.name || "Poster"}
            fill
            className="object-cover"
          />
        )}

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent/300 md:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div
        className="
        relative z-20
        h-full
        flex flex-col
        justify-end md:justify-center
        px-6 md:px-20
        pb-10 md:pb-0
        md:w-1/2
        space-y-3 md:space-y-4
      "
      >
        <h1 className="text-2xl md:text-6xl font-bold drop-shadow-lg">
          CineBox
        </h1>

        <h2 className="text-xl md:text-3xl font-bold drop-shadow-lg hidden md:block">
          {movie.title || movie.name}
        </h2>

        <p className="text-sm md:text-lg text-foreground line-clamp-2 md:line-clamp-3 drop-shadow-md hidden md:block">
          {movie.overview}
        </p>

        <div className="flex gap-3 pt-2 md:pt-4 flex-wrap">
          {trailerKey && (
            <>
              <Button
                onClick={handleOpenTrailer}
                size="sm"
                className="md:size-lg hover:bg-zinc-500/70 hover:scale-105 transition"
              >
                <Expand />
              </Button>

              <Button
                size="sm"
                onClick={() => setActiveVideoId(isActive ? null : heroId)}
                className="md:size-lg hover:bg-zinc-500/70 hover:scale-105 transition"
              >
                {isActive ? <Volume2 /> : <VolumeOff />}
              </Button>
            </>
          )}

          <Button
            size="sm"
            className="
              md:size-lg
              bg-zinc-500/50
              text-white
              hover:bg-zinc-500/70
              backdrop-blur-md
            "
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
}
