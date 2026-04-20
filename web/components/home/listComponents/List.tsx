// Components
import { MovieRow } from "./MovieRow";
import { BannerList } from "./BannerList";

// Types
import { HomeListProps } from "@/types/components";

const primaryRows = [
  { title: "New Releases", dataKey: "heroList" },
  { title: "Trending Now", dataKey: "popularList" },
] as const;

export function List({ processedData, isFetchingNextPage, type }: HomeListProps) {
  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const featuredMovie = processedData.topRatedList[0];

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <div className="space-y-2">
        <div className="ps-0 md:ps-20">
          {primaryRows.map((row) => (
            <MovieRow
              key={row.dataKey}
              title={row.title}
              movies={processedData[row.dataKey]}
              type={type}
            />
          ))}
        </div>

        {featuredMovie && <BannerList featuredMovie={featuredMovie} />}

        <div className="ps-0 md:ps-20">
          <MovieRow
            title="top rated"
            movies={processedData.topRatedList}
            rowStyle="bigger"
            type={type}
          />

          {processedData.genres.map((genre) => (
            <MovieRow
              key={genre.key}
              title={genre.label}
              movies={genre.data || []}
              genreId={genre.genreId}
              type={type}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 flex h-40 w-full items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
            <span className="text-xs font-medium text-zinc-500">
              Loading more movies...
            </span>
          </div>
        )}
      </div>
    </>
  );
}
