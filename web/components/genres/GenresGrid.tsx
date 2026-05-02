"use client";

// Components
import { MovieCard } from "../shared/Card/MovieCard";

// Types
import { Genre } from "@/types/components";
import { Movie } from "@/types/movie";

export default function GenresGrid({ initialData, type, isPending }: Genre) {
  /*
  | -------------------------------------------------------------------------
  | Render
  |-------------------------------------------------------------------------
  */

  return (
    <div className="grid gap-5 md:gap-1 w-full mt-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {isPending
        ? Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="h-58 w-full animate-pulse rounded-xl bg-zinc-800/50"
            />
          ))
        : initialData.data.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} type={type} />
          ))}
    </div>
  );
}
