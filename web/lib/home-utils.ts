import { fetchMediaTrailer } from "@/services/movieService";

export async function getHeroTrailers(movieId?: number, tvId?: number) {
  let movieTrailer = null;
  let tvTrailer = null;

  if (movieId) {
    try {
      movieTrailer = await fetchMediaTrailer(movieId, "movie");
    } catch (error) {
      console.warn("Movie trailer non trovato, uso fallback statico.", error);
    }
  }

  if (tvId) {
    try {
      tvTrailer = await fetchMediaTrailer(tvId, "tv");
    } catch (error) {
      console.warn("TV trailer non trovato, uso fallback statico.", error);
    }
  }

  return { movieTrailer, tvTrailer };
}
