import Image from "next/image";

// Components
import { MovieRow } from "@/components/home/MovieRow";

// Types
import { HomeListProps } from "@/types/components";

const primaryRows = [
  { title: "New Releases", dataKey: "heroList" },
  { title: "Trending Now", dataKey: "popularList" },
] as const;

export function List({
  processedData,
  isFetchingNextPage,
}: HomeListProps) {
  const featuredMovie = processedData.topRatedList[0];

  return (
    <>
      <div className="space-y-2">
        <div className="ps-0 md:ps-20">
          {primaryRows.map((row) => (
            <MovieRow
              key={row.dataKey}
              title={row.title}
              movies={processedData[row.dataKey]}
            />
          ))}
        </div>

        {featuredMovie && (
          <section className="relative my-10 h-[40vh] w-full pr-4 md:pr-20">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-transparent to-background/80" />
            <Image
              alt={featuredMovie.title || featuredMovie.name || "Featured movie"}
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              className="h-full w-full rounded-xl object-cover opacity-50"
              fill
            />
            <div className="absolute bottom-10 left-10 z-20 max-w-md">
              <span className="text-red-600 font-bold uppercase text-xs tracking-[0.3em]">
                Must Watch
              </span>
              <h3 className="text-4xl font-black">
                {featuredMovie.title || featuredMovie.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                {featuredMovie.overview}
              </p>
            </div>
          </section>
        )}

        <div className="ps-0 md:ps-20">
          <MovieRow
            title="top rated"
            movies={processedData.topRatedList}
            scope="top-rated"
          />

          {processedData.genres.map((genre) => (
            <MovieRow
              key={genre.key}
              title={genre.label}
              movies={genre.data || []}
              genreId={genre.genreId}
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
