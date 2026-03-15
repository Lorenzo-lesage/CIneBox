"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";

// Custom Hooks
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMute } from "@/hooks/useMute";

// Store
import { useAudioStore } from "@/store/audioStore";

// Fetch
import { fetchMovieTrailer } from "@/services/movieService";
import { useQuery } from "@tanstack/react-query";

// UI
import { Card, CardContent } from "@/components/ui/card";

// Icons
import { Info, Heart, Volume2, VolumeOff } from "lucide-react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  trailer_url?: string;
}

export function MovieCard({ movie }: { movie: Movie }) {
  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const isMobile = useIsMobile();
  const { playerRef, forceMute } = useMute(true);
  const { activeVideoId, setActiveVideoId } = useAudioStore();
  const cardUniqueId = `card-${movie.id}`;
  const isActive = activeVideoId === cardUniqueId;

  /*
  |--------------------------------------------------------------------------
  | Query for trailer
  |--------------------------------------------------------------------------
  | Query is enabled only when the card is hovered.
  | Once enabled, the query is cached for 30 minutes.
  */
  const { data: trailerData } = useQuery({
    queryKey: ["trailer", movie.id],
    queryFn: () => fetchMovieTrailer(movie.id),
    enabled: isHovered,
    staleTime: 1000 * 60 * 30,
  });

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  */

  /**
   * Handle mouse enter
   */
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  /**
   * Handle mouse leave
   */
  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
    forceMute();
  };

  /*
  |--------------------------------------------------------------------------
  | Hooks
  |--------------------------------------------------------------------------
  */

  /**
   * Check if the card is hovered
   * If hovered, show the video
   * If not hovered, hide the video
   * Adding delay to show the video
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isHovered && trailerData?.trailer_key) {
      timer = setTimeout(() => {
        setShowVideo(true);
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [isHovered, trailerData?.trailer_key]);

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <Card
      className="h-80 bg-transparent border-none group cursor-pointer overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent
        className={`p-0 relative w-full h-full transition-all duration-300 hover:scale-110 ${
          showVideo
            ? "scale-110 shadow-2xl z-50 overflow-visible"
            : "overflow-visible"
        }`}
      >
        <div>
          {/* Poster */}
          <div className="relative w-full h-64">
            <Image
              src={`https://image.tmdb.org/t/p/w780${isMobile ? movie.poster_path : movie.backdrop_path || movie.poster_path}`}
              alt={movie.title || movie.name || "Poster"}
              fill
              sizes="100%"
              className={`object-cover transition-opacity duration-500 ${
                showVideo ? "opacity-0" : "opacity-100"
              }`}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Player Video at hover */}
          {showVideo && trailerData && (
            <div className="absolute inset-0 z-20 bg-black">
              <div className="relative h-full w-full">
                <ReactPlayer
                  ref={playerRef}
                  src={`https://www.youtube.com/watch?v=${trailerData.trailer_key}`}
                  playing
                  controls={false}
                  muted={!isActive}
                  width="100%"
                  height="100%"
                />

                <div
                  className="cursor-pointer bg-black/50 p-1 rounded-full absolute bottom-4 left-4 text-white z-21"
                  onClick={() =>
                    setActiveVideoId(isActive ? null : cardUniqueId)
                  }
                >
                  {isActive ? <VolumeOff /> : <Volume2 />}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- Content Card --- */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {/* Button detail and like */}
          <div className="absolute top-0 right-[50%] text-white z-21 transform translate-x-1/2 -translate-y-1/2 z-21 flex items-center gap-2">
            <div className="cursor-pointer bg-black/50 p-1 rounded-full">
              <Info />
            </div>
            <div className="cursor-pointer bg-black/50 p-1 rounded-full">
              <Heart
                className={`${isFavorited ? "text-red-500 fill-red-500" : ""}`}
                onClick={() => setIsFavorited(!isFavorited)}
              />
            </div>
          </div>

          {/* Title */}
          <p
            className="text-white font-bold text-sm truncate"
            style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
          >
            {movie.title || movie.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {/* Rating */}
            <span
              className="text-yellow-400 text-xs"
              style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.8)" }}
            >
              ★ {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
