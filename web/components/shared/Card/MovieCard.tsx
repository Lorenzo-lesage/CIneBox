"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Custom Hooks
import { useMute } from "@/hooks/useMute";

// Store
import { useAudioStore } from "@/store/audioStore";

// Fetch
import { fetchMediaTrailer } from "@/services/movieService";
import { useQuery } from "@tanstack/react-query";

// Componets
import { MovieCardControls } from "./MovieCardControls";
import { MovieCardPlayer } from "./MovieCardPlayer";
import { MovieCardText } from "./MovieCardText";

// UI
import { Card, CardContent } from "@/components/ui/card";

// Types
import { MovieCardProps } from "@/types/components";

export function MovieCard({ movie, rowStyle = "default", type }: MovieCardProps) {
  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const { playerRef, forceMute } = useMute(true);
  const { activeVideoId, setActiveVideoId } = useAudioStore();
  const cardUniqueId = `card-${movie.id}-${type}`;
  const isActive = activeVideoId === cardUniqueId;

  /*
  |--------------------------------------------------------------------------
  | Query for trailer
  |--------------------------------------------------------------------------
  | Query is enabled only when the card is hovered.
  | Once enabled, the query is cached for 30 minutes.
  */
  const { data: trailerData } = useQuery({
    queryKey: ["trailer", movie.id, type],
    queryFn: () => fetchMediaTrailer(movie.id, type),
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
      className={cn(
        "h-50 md:h-50 bg-transparent !border-0 !ring-0 p-0 group cursor-pointer overflow-visible rounded-xl",
        rowStyle === "bigger" && "h-50 md:h-100",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent className={cn(
        "p-0 relative w-full h-full transition-all duration-300 md:hover:scale-130 hover:z-5 group",
        rowStyle === "bigger" && "md:hover:scale-110",
      )}>
        <MovieCardPlayer
          trailerKey={trailerData?.trailer_key || ""}
          isActive={isActive}
          toggleActive={() => setActiveVideoId(isActive ? null : cardUniqueId)}
          movie={movie}
          showVideo={showVideo}
          playerRef={playerRef}
          rowStyle={rowStyle}
        />

        {/* --- Content Card --- */}
        <div className="absolute inset-0 flex flex-col justify-end md:px-4 md:pb-2 p-1">
          {/* Button detail and like */}
          <div className="absolute top-0 right-[50%] text-white transform translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group-hover:z-21">
            <MovieCardControls
              movie={movie}
              isFavorited={isFavorited}
              toggleFavorite={() => setIsFavorited(!isFavorited)}
            />
          </div>

          {/* Text */}
          <MovieCardText movie={movie} />
        </div>
      </CardContent>
    </Card>
  );
}
