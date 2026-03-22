import { fetchHomeData } from "@/services/movieService";
import HomePageClient from "@/components/home/HomePageClient";

export default async function Page() {
  const [initialMovieData, initialTvData] = await Promise.all([
    fetchHomeData("movie", 1),
    fetchHomeData("tv", 1),
  ]);

  return (
    <HomePageClient 
      initialMovieData={initialMovieData} 
      initialTvData={initialTvData} 
    />
  );
}