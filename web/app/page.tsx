"use client";
import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";

// Libs
import { getHomeData } from "@/lib/tmdb";

// Components
import { MovieRow } from "@/components/home/MovieRow";

// UI
import { Button } from "@/components/ui/button";

export default function HomePage() {
  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const [data, setData] = useState<any>(null);
  const [type, setType] = useState<"movie" | "tv">("movie");
  const [genres, setGenres] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.1 });

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  */

  /**
   * Function to load more data
   */
  const loadData = useCallback(
    async (isInitial = false, currentPage: number) => {
      if (loadingMore || (!isInitial && !hasMore)) return;

      setLoadingMore(true);
      try {
        const response = await getHomeData(type, currentPage);

        // Estraiamo i generi dalla risposta
        const extractedGenres = Object.keys(response)
          .filter(
            (key) => !["hero", "popular", "hasMore", "nextPage"].includes(key),
          )
          .map((key) => ({ key, ...response[key] }));

        if (isInitial) {
          setData(response);
          setGenres([]); // Reset generi extra quando cambiamo tipo
          setPage(1);
        } else {
          setGenres((prev) => [...prev, ...extractedGenres]);
          setPage(currentPage);
        }

        setHasMore(response.hasMore);
      } catch (error) {
        console.error("Errore:", error);
      } finally {
        setLoadingMore(false);
      }
    },
    [type, hasMore, loadingMore],
  );

  /*
  |--------------------------------------------------------------------------
  | Hooks
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    getHomeData(type, 1).then(setData).catch(console.error);
  }, [type]);

  useEffect(() => {
    loadData(true, 1);
  }, [type]);

  // Hook per lo scroll infinito
  useEffect(() => {
    if (inView && hasMore && !loadingMore && data) {
      loadData(false, page + 1);
    }
  }, [inView, hasMore, loadingMore, data, page, loadData]);

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  if (!data)
    return <div className="p-10 text-white bg-black h-screen">Loading...</div>;

  console.log(data);

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      {/* Hero Header */}
      <div className="relative w-full flex items-end p-10 bg-gradient-to-t from-black to-transparent mb-10">
        {data.hero?.[0] && (
          <div className="z-10 space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase italic">
              {data.hero[0].title || data.hero[0].name}
            </h1>
          </div>
        )}
      </div>

      {/* Switchers */}
      <div className="flex gap-2 px-10 mb-10">
        <Button
          variant={type === "movie" ? "destructive" : "outline"}
          onClick={() => setType("movie")}
        >
          Movies
        </Button>
        <Button
          variant={type === "tv" ? "destructive" : "outline"}
          onClick={() => setType("tv")}
        >
          TV Series
        </Button>
      </div>

      <div className="space-y-12 px-20">
        {/* 1. Trending (Sempre presente nella pagina 1) */}
        <MovieRow title="Trending Now" movies={data.popular || []} />

        {/* 2. Generi della Pagina 1 */}
        {Object.keys(data)
          .filter(
            (key) => !["hero", "popular", "hasMore", "nextPage"].includes(key),
          )
          .map((key) => (
            <MovieRow
              key={key}
              title={data[key].label || key}
              movies={data[key].data || []}
              genreId={key}
            />
          ))}

        {/* 3. Generi caricati con lo scroll (Pagina 2, 3...) */}
        {genres.map((genre) => (
          <MovieRow
            key={`${genre.key}-${page}`}
            title={genre.label}
            movies={genre.data || []}
            genreId={genre.key}
          />
        ))}
      </div>

      {/* 4. SENSORE PER INFINITE SCROLL */}
      <div ref={ref} className="h-40 flex items-center justify-center w-full">
        {loadingMore && (
          <div className="animate-pulse text-red-600 font-bold">Loading...</div>
        )}
      </div>
    </main>
  );
}
