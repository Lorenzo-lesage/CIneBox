"use client";

import { MovieCard } from "../shared/Card/MovieCard";

export default function GenresGrid({ initialData, type }: any) {
  /*
  | -------------------------------------------------------------------------
  | Data
  |-------------------------------------------------------------------------
  */

  /*
  | -------------------------------------------------------------------------
  | Methods
  |-------------------------------------------------------------------------
  */

  /*
  | -------------------------------------------------------------------------
  | Render
  |-------------------------------------------------------------------------
  */

return (
    <div className="grid gap-1 w-full mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {initialData.data.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} type={type} />
      ))}
    </div>
  );
}
