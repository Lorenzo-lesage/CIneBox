"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSearchMedia } from "@/services/movieService";

// Components
import { MovieCard } from "@/components/shared/Card/MovieCard";
import { NoDataFound } from "@/components/search/NoDataFound";
import { ErrorData } from "@/components/search/ErrorData";

// Types
import { Movie } from "@/types/movie";
import { SearchResultsProps } from "@/types/search";

export function SearchResults({
  query,
  page,
  onPagination,
}: SearchResultsProps) {
  /*
  | -------------------------------------------------------------------------
  | State
  |-------------------------------------------------------------------------
  */

  const { data, isPending, error } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => fetchSearchMedia(query, page),
    enabled: query.length > 0,
    placeholderData: (previousData) => previousData,
  });

  /*
  | -------------------------------------------------------------------------
  | Render
  |-------------------------------------------------------------------------
  */

  if (error) return <ErrorData error={error as Error} />;

  if (!isPending && data?.results?.length === 0) return <NoDataFound />;

  return (
    <div>
      <div className="grid gap-x-5 gap-y-10 w-full mt-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-10">
        {isPending && !data
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-58 w-full animate-pulse rounded-xl bg-zinc-800/50 mb-15"
              />
            ))
          : data?.results?.map((media: Movie) => (
              <div key={media.id} className="w-full">
                <MovieCard movie={media} type={media.media_type} />
              </div>
            ))}
      </div>
      {data?.pagination && data.pagination.total_pages > 1 ? (
        <div>
          {onPagination(
            data.pagination.total_pages,
            data.pagination.current_page,
            isPending,
          )}
        </div>
      ) : null}
    </div>
  );
}
