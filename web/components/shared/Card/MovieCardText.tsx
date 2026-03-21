// UI
import { Badge } from "@/components/ui/badge";

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
        <Badge className="text-xs" variant={"secondary"}>
          <span
            className="text-yellow-500 text-xs"
          >
            ★ {movie?.vote_average?.toFixed(1)}
          </span>
        </Badge>
      </div>
    </>
  );
}
