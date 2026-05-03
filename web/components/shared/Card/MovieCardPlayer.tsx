import ReactPlayer from "react-player";
import { cn } from "@/lib/utils";

// Hooks
import { useIsMobile } from "@/hooks/useIsMobile";

// Components
import MovieImage from "./MovieImage";

// Icons
import { Volume2, VolumeOff } from "lucide-react";

// types
import { MovieCardPlayerProps } from "@/types/components";

export function MovieCardPlayer({
  movie,
  trailerKey,
  showVideo,
  isActive,
  toggleActive,
  playerRef,
  rowStyle = "default",
}: MovieCardPlayerProps) {
  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const isMobile = useIsMobile();
  const noMedia = !movie.poster_path && !movie.backdrop_path && !trailerKey;

  /*
  |--------------------------------------------------------------------------
  | Return
  |--------------------------------------------------------------------------
  */

  return (
    <div>
      {/* Poster */}
      <div
        className={cn(
          "relative w-full h-50 group",
          rowStyle === "bigger" && "h-50 md:h-86 aspect-[2/3]",
        )}
      >
        <MovieImage
          src={`https://image.tmdb.org/t/p/w780${isMobile || rowStyle === "bigger" ? movie.poster_path : movie.backdrop_path || movie.poster_path}`}
          alt={movie.title || movie.name || "Poster"}
          className={cn(
            "object-cover transition-opacity duration-500 z-10 w-full rounded-lg hover:rounded-t-lg hover:rounded-b-xs",
            showVideo && !isMobile ? "opacity-0" : "opacity-100",
            rowStyle === "bigger"
              ? "h-50 md:h-86 aspect-[2/3] object-cover"
              : "h-full object-cover",
            noMedia && "bg-background",
          )}
        />
        {/* Overlay gradient */}
        {noMedia ? (
          <div className="absolute -bottom-0.5 inset-0 bg-background pointer-events-none md:block hidden rounded-t-lg" />
        ) : (
          <div className="absolute -bottom-0.5 inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none md:block hidden" />
        )}

        {/* Player Video at hover */}
        {showVideo && trailerKey && !isMobile && (
          <div className="absolute inset-0 z-20 bg-black rounded-t-lg overflow-hidden">
            <div className="relative h-full w-full">
              <ReactPlayer
                ref={playerRef}
                src={`https://www.youtube-nocookie.com/watch?v=${trailerKey}`}
                playing
                controls={false}
                muted={!isActive}
                width="100%"
                height="100%"
              />

              <div
                className="cursor-pointer bg-background/50 p-1 rounded-full absolute bottom-4 left-4 text-white z-21"
                onClick={toggleActive}
              >
                {isActive ? <Volume2 /> : <VolumeOff />}
              </div>
            </div>
          </div>
        )}
        <div
          className={cn(
            "hidden group-hover:block absolute -bottom-10 z-50 w-full h-10 px-4 space-y-1 bg-background rounded-b-lg",
            rowStyle === "bigger" && "-bottom-13 h-12",
          )}
        >
          <p className="text-primary truncate">
            {movie.genres.map((genre) => genre).join(" - ")}
          </p>
          <p className="text-primary text-xs italic text-center">
            {movie?.release_date}
          </p>
        </div>
      </div>
    </div>
  );
}
