"use client";
import { useEffect, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useTransition } from "react";

// React Query & Services
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchHomeData } from "@/services/movieService";

// Components
import { HeroBanner } from "@/components/home/HeroBanner";
import { Switcher } from "@/components/shared/Switcher";
import { HeroTrailerModal } from "@/components/home/HeroTrailerModal";
import { List } from "@/components/home/listComponents/List";

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
  const [isPending, startTransition] = useTransition();

  /*
  |--------------------------------------------------------------------------
  | Query
  |--------------------------------------------------------------------------
  */

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["homeData", type],
      queryFn: ({ pageParam = 1 }) => fetchHomeData(type, pageParam),
      initialPageParam: 2,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
      staleTime: 1000 * 60 * 5,
    });
  const isInitialLoading = !data && !serverData;
  const isSwitching = isFetching && !isFetchingNextPage;

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
    if (isSwitching && !data) {
      return { heroList: [], popularList: [], topRatedList: [], genres: [] };
    }
    // Generi della pagina 1 (Server)
    const initialGenres = Object.keys(serverData)
      .filter(
        (key) => !["hero", "popular", "hasMore", "nextPage"].includes(key),
      )
      .map((key) => ({
        ...serverData[key],
        key: `server-${key}`,
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
          })),
      ) || [];

    return {
      heroList: serverData.hero || [],
      popularList: serverData.popular || [],
      topRatedList: serverData.top_rated || [],
      genres: [...initialGenres, ...extraGenres],
    };
  }, [data, serverData, isSwitching]);

  const handleTypeChange = (newType: "movie" | "tv") => {
    startTransition(() => {
      setType(newType);
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <main
      className={
        isPending
          ? "opacity-50 transition-opacity min-h-screen pb-20"
          : "opacity-100 min-h-screen pb-20"
      }
    >
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
        <Switcher
          type={type}
          setType={handleTypeChange}
          isPending={isPending}
        />
      </div>

      {/* --- Movies --- */}
      <div>
        <List
          processedData={processedData}
          isFetchingNextPage={isFetchingNextPage}
          type={type}
          isLoading={isInitialLoading || isSwitching}
        />
      </div>
    </main>
  );
}
