export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  trailer_url?: string;
}

export type MediaType = "movie" | "tv";
