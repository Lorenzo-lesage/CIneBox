// Fetch
import { fetchHomeData } from "@/services/movieService";

// Utils
import { getHeroTrailers } from "@/lib/home-utils";

// Components
import HomePageClient from "@/components/home/HomePageClient";

export default async function Page() {
  /*
  |--------------------------------------------------------------------------
  | Fetch SSR
  |--------------------------------------------------------------------------
  */

  /**
   * Fetch Home page data
   */
  const [initialMovieData, initialTvData] = await Promise.all([
    fetchHomeData("movie", 1),
    fetchHomeData("tv", 1),
  ]);

  /**
   * Fetch Hero trailers
   */
  const { movieTrailer, tvTrailer } = await getHeroTrailers(
    initialMovieData?.hero?.[0]?.id,
    initialTvData?.hero?.[0]?.id,
  );

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <HomePageClient
      initialMovieData={initialMovieData}
      initialTvData={initialTvData}
      initialMovieTrailerData={movieTrailer}
      initialTvTrailerData={tvTrailer}
    />
  );
}
