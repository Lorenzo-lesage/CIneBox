"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchHomeData } from "@/services/movieService";
import { MovieRow } from "@/components/home/MovieRow";
import { Switcher } from "@/components/shared/Switcher";
import { HeroTrailerModal } from "@/components/home/HeroTrailerModal";
import type { HomePageData } from "@/types";

interface Props {
  initialData: HomePageData;
  initialType: "movie" | "tv";
  initialTrailer?: string;
}

export function HomeClientContent({ 
  initialData, 
  initialType, 
  initialTrailer 
}: Props) {
  const [type, setType] = useState<"movie" | "tv">(initialType);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [openTrailer, setOpenTrailer] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["homeData", type],
      queryFn: ({ pageParam = 1 }) => fetchHomeData(type, pageParam),
      initialPageParam: 1,
      initialData: type === initialType 
        ? { pages: [initialData], pageParams: [1] } 
        : undefined,
      getNextPageParam: (lastPage) => 
        lastPage.hasMore ? lastPage.nextPage : undefined,
      staleTime: 1000 * 60 * 5,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const getProcessedData = () => {
    if (!data) return null;
    const firstPage = data.pages[0];
    const genreRows = data.pages.flatMap((page, pageIndex) =>
      Object.keys(page)
        .filter((key) => !["hero", "popular", "hasMore", "nextPage"].includes(key))
        .map((key) => ({
          ...page[key],
          key: `${key}-${pageIndex}`,
          genreId: key,
        }))
    );

    return {
      heroList: firstPage.hero || [],
      popularList: firstPage.popular || [],
      genres: genreRows,
    };
  };

  const processedData = getProcessedData();

  return (
    <>
      {openTrailer && (
        <HeroTrailerModal
          videoKey={initialTrailer || ""}
          setOpenTrailer={setOpenTrailer}
        />
      )}

      <div className="mt-10 w-full flex justify-center">
        <Switcher type={type} setType={setType} />
      </div>

      <div className="space-y-2 ps-10 md:ps-20 overflow-hidden">
        <MovieRow title="New Releases" movies={processedData?.heroList} />
        <MovieRow title="Trending Now" movies={processedData?.popularList} />

        {processedData?.genres.map((genre) => (
          <MovieRow
            key={genre.key}
            title={genre.label}
            movies={genre.data || []}
            genreId={genre.genreId}
          />
        ))}
      </div>

      <div ref={ref} className="h-40 flex items-center justify-center w-full mt-10">
        {isFetchingNextPage && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-zinc-500 text-xs font-medium">
              Loading more movies...
            </span>
          </div>
        )}
      </div>
    </>
  );
}