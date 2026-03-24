export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  trailer_url?: string;
  genres: string[];
  release_date: string;
  popularity: number;
  scope: "movie" | "top-rated";
}

export type MediaType = "movie" | "tv";
