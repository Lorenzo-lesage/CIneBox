"use client";
import { useEffect, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";

// React Query & Services
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchHomeData } from "@/services/movieService";

// Components
import { HeroBanner } from "@/components/home/HeroBanner";
import { Switcher } from "@/components/shared/Switcher";
import { HeroTrailerModal } from "@/components/home/HeroTrailerModal";
import { List } from "@/components/home/List";

// Types
import { HomePageClientProps } from "@/types/components";

export default function HomePageClient({
  initialMovieData,
  initialTvData,
  initialMovieTrailerData,
  initialTvTrailerData,
}: HomePageClientProps) {
  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const [type, setType] = useState<"movie" | "tv">("movie");
  const { inView } = useInView({ threshold: 0.1 });
  const [openTrailer, setOpenTrailer] = useState(false);
  const serverData = type === "movie" ? initialMovieData : initialTvData;
  const currentTrailer =
    type === "movie" ? initialMovieTrailerData : initialTvTrailerData;
  const trailerKey = currentTrailer?.trailer_key || null;

  /*
  |--------------------------------------------------------------------------
  | Query
  |--------------------------------------------------------------------------
  */

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["homeData", type],
      queryFn: ({ pageParam = 1 }) => fetchHomeData(type, pageParam),
      initialPageParam: 2,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
      staleTime: 1000 * 60 * 5,
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

  const processedData = useMemo(() => {
    // Generi della pagina 1 (Server)
    const initialGenres = Object.keys(serverData)
      .filter(
        (key) => !["hero", "popular", "hasMore", "nextPage"].includes(key),
      )
      .map((key) => ({
        ...serverData[key],
        key: `server-${key}`,
        genreId: key,
      }));

    // Generi caricate via Scroll (Client)
    const extraGenres =
      data?.pages.flatMap((page, pageIndex) =>
        Object.keys(page)
          .filter(
            (key) =>
              !["hero", "popular", "top_rated", "hasMore", "nextPage"].includes(
                key,
              ),
          )
          .map((key) => ({
            ...page[key],
            key: `extra-${key}-${pageIndex}`,
            genreId: key,
          })),
      ) || [];

    return {
      heroList: serverData.hero || [],
      popularList: serverData.popular || [],
      topRatedList: serverData.top_rated || [],
      genres: [...initialGenres, ...extraGenres],
    };
  }, [data, serverData]);

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen pb-20">
      {/* --- Hero Header ---- */}
      <HeroBanner
        movie={serverData.hero[0]}
        trailerKey={trailerKey}
        openTrailer={openTrailer}
        setOpenTrailer={setOpenTrailer}
      />

      {/* --- Trailer Modal --- */}
      {openTrailer && (
        <HeroTrailerModal
          videoKey={trailerKey}
          setOpenTrailer={setOpenTrailer}
        />
      )}

      {/* --- Switchers --- */}
      <div className="mt-10 w-full flex justify-center">
        <Switcher type={type} setType={setType} />
      </div>

      {/* --- Movies --- */}
      <List processedData={processedData} isFetchingNextPage={isFetchingNextPage} />
    </main>
  );
}
