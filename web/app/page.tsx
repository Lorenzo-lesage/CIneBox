"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// Hooks
import { useRandomHero } from "@/hooks/useRandomHero";

// React Query & Services
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchHomeData, fetchMovieTrailer } from "@/services/movieService";

// Components
import { MovieRow } from "@/components/home/MovieRow";
import { HeroBanner } from "@/components/home/HeroBanner";
import { Switcher } from "@/components/shared/Switcher";
import { HeroTrailerModal } from "@/components/home/HeroTrailerModal";

export default function HomePage() {
  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const [type, setType] = useState<"movie" | "tv">("movie");
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [openTrailer, setOpenTrailer] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Query
  |--------------------------------------------------------------------------
  */

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["homeData", type],
      queryFn: ({ pageParam = 1 }) => fetchHomeData(type, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      placeholderData: (prev) => prev,
    });

  const firstPage = data?.pages?.[0];
  const heroBanner = useRandomHero(firstPage?.hero);

  const { data: trailerData } = useQuery({
    queryKey: ["trailer", heroBanner?.id],
    queryFn: () => fetchMovieTrailer(heroBanner!.id as number),
    enabled: !!heroBanner?.id,
    staleTime: 1000 * 60 * 30,
  });

  /*
  |--------------------------------------------------------------------------
  | Hooks
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  */

  /**
   * Function to load more data
   */
  const getProcessedData = () => {
    if (!data) return null;

    const firstPage = data.pages[0];

    // Prendiamo i generi filtrando via hero e popular (così non si ripetono nel loop)
    const genreRows = data.pages.flatMap((page, pageIndex) =>
      Object.keys(page)
        .filter(
          (key) => !["hero", "popular", "hasMore", "nextPage"].includes(key),
        )
        .map((key) => ({
          ...page[key],
          key: `${key}-${pageIndex}`,
          genreId: key,
        })),
    );

    return {
      heroBanner: heroBanner, // Il film singolo per lo sfondo
      heroList: firstPage.hero || [], // L'array completo per il carosello "Settimana"
      popularList: firstPage.popular || [], // L'array per il carosello "Popolari"
      genres: genreRows, // Il resto dei caroselli dinamici
    };
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  const processedData = getProcessedData();

  if (status === "pending")
    return (
      <div className="p-10 text-white bg-black h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      {/* --- Hero Header ---- */}
      {processedData?.heroBanner && (
        <HeroBanner
          movie={processedData.heroBanner}
          trailerKey={trailerData?.trailer_key}
          openTrailer={openTrailer}
          setOpenTrailer={setOpenTrailer}
        />
      )}

      {/* --- Trailer Modal --- */}
      {openTrailer && (
        <HeroTrailerModal
          videoKey={trailerData?.trailer_key || ""}
          setOpenTrailer={setOpenTrailer}
        />
      )}

      {/* --- Switchers --- */}
      <Switcher type={type} setType={setType} />

      {/* --- Movies --- */}
      <div className="space-y-2 ps-10 md:ps-20 overflow-hidden">
        {/* Hero List */}
        <MovieRow title="New Releases" movies={processedData?.heroList} />
        {/* Trending */}
        <MovieRow title="Trending Now" movies={processedData?.popularList} />

        {/* Genres */}
        {processedData?.genres.map((genre) => (
          <MovieRow
            key={genre.key}
            title={genre.label}
            movies={genre.data || []}
            genreId={genre.genreId}
          />
        ))}
      </div>

      {/* Loading Trigger */}
      <div
        ref={ref}
        className="h-40 flex items-center justify-center w-full mt-10"
      >
        {isFetchingNextPage && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-zinc-500 text-xs font-medium">
              Loading more movies...
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
