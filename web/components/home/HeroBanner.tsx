"use client";
import React from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAudioStore } from "@/store/audioStore";
import { Volume2, VolumeOff, Expand } from "lucide-react";

interface HeroBannerProps {
  movie: any;
  trailerKey?: string;
  openTrailer: boolean;
  setOpenTrailer: (open: boolean) => void;
}

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
    setActiveVideoId(heroId);
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        {trailerKey ? (
          <div className="w-full h-full relative">
            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${trailerKey}`}
              playing={true}
              muted={!isActive}
              loop={true}
              width="100%"
              height="100%"
              className="scale-140"
              controls={false}
            />
          </div>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title || movie.name || "CineBox"}
            fill
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      </div>

      {/* Overlay info */}
      <div className="relative z-20 h-full flex flex-col justify-center px-10 md:px-20 w-full md:w-1/2 space-y-4">
        <h1 className="text-3xl md:text-7xl font-bold drop-shadow-lg">
          CineBox
        </h1>
        <h2 className="text-3xl md:text-3xl font-bold drop-shadow-lg">
          {movie.title || movie.name}
        </h2>
        <p className="text-lg text-zinc-300 line-clamp-3 drop-shadow-md">
          {movie.overview}
        </p>
        <div className="flex gap-4 pt-4">
          {trailerKey && (
            <>
              <Button
                onClick={handleOpenTrailer}
                size="lg"
                className="hover:bg-zinc-500/70 hover:scale-110 transition-all cursor-pointer text-xl"
              >
                <Expand />
              </Button>
              <Button
                size="lg"
                onClick={() => setActiveVideoId(isActive ? null : heroId)}
                className="hover:scale-110 hover:bg-zinc-500/70 transition-all cursor-pointer text-xl"
              >
                {isActive ? <VolumeOff /> : <Volume2 />}
              </Button>
            </>
          )}
          <Button
            size="lg"
            className="bg-zinc-500/50 hover:scale-105 text-white hover:bg-zinc-500/70 text-xl font-bold backdrop-blur-md"
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
}
