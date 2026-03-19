// types
import { MovieCardTextProps } from "@/types/components";

export function MovieCardText({ movie }: MovieCardTextProps) {
  return (
    <>
      <p
        className="text-white font-bold text-sm truncate"
        style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 1)" }}
      >
        {movie.title || movie.name}
      </p>
      <div className="flex items-center gap-2 mt-1">
        {/* Rating */}
        <span
          className="text-yellow-400 text-xs"
          style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.8)" }}
        >
          ★ {movie?.vote_average?.toFixed(1)}
        </span>
      </div>
    </>
  );
}
