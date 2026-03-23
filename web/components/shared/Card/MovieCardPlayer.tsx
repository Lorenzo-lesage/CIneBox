import ReactPlayer from "react-player";

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
}: MovieCardPlayerProps) {
  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const isMobile = useIsMobile();

  /*
  |--------------------------------------------------------------------------
  | Return
  |--------------------------------------------------------------------------
  */

  return (
    <div>
      {/* Poster */}
      <div className="relative w-full h-50 group">
        <MovieImage
          src={`https://image.tmdb.org/t/p/w780${isMobile ? movie.poster_path : movie.backdrop_path || movie.poster_path}`}
          alt={movie.title || movie.name || "Poster"}
          className={`object-cover transition-opacity duration-500 h-full z-10 ${
            showVideo && !isMobile ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Overlay gradient */}
        <div className="absolute -bottom-1 inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

        {/* Player Video at hover */}
        {showVideo && trailerKey && !isMobile && (
          <div className="absolute inset-0 z-20 bg-black">
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
        <div className="hidden group-hover:block absolute -bottom-10 z-50 w-full px-4 space-y-1">
          <p className="text-primary truncate">
            {movie.genres.map((genre) => genre).join(" - ")}
          </p>
          <p className="text-primary text-xs italic text-center">{movie.release_date}</p>
        </div>
      </div>
    </div>
  );
}
