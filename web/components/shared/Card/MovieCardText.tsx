// UI
import { Badge } from "@/components/ui/badge";

// Icons
import { TrendingUp, Star } from "lucide-react";

// types
import { MovieCardTextProps } from "@/types/components";

export function MovieCardText({ movie }: MovieCardTextProps) {
  return (
    <>
      <p
        className="text-white font-bold text-sm truncate md:block hidden"
        style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 1)" }}
      >
        {movie.title || movie.name}
      </p>
      <div className="flex items-center gap-2 mt-1 justify-between w-full">
        {/* Rating */}
        <Badge className="text-xs gap-4" variant={"secondary"}>
          <span className="text-yellow-500 text-xs flex gap-2 items-center">
            <Star size={10} className="fill-yellow-500" />{" "}
            {movie?.vote_average?.toFixed(1)}
          </span>
        </Badge>

        <Badge className="text-xs gap-4" variant={"secondary"}>
          <span className=" text-xs flex gap-2 items-center">
            <TrendingUp size={10} />
            {movie?.popularity?.toFixed(0)}
          </span>
        </Badge>
      </div>
    </>
  );
}
