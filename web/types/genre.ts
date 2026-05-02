import { Movie, MediaType } from "./movie";

export type GenreSortValue =
  | "popular"
  | "top_rated"
  | "latest"
  | "newest"
  | "oldest"
  | "title_az"
  | "title_za";
  

export interface GenreMetadata {
  id: number;
  type: MediaType;
  key: string | null;
  label: string | null;
}

export interface GenrePageResponse {
  data: Movie[];
  current_page: number;
  total_pages: number;
  total_results: number;
  genre: GenreMetadata;
}

export interface GenrePageClientProps {
  initialData: GenrePageResponse;
  type: MediaType;
  initialSortBy: GenreSortValue;
}

export interface GenrePageProps {
  params: Promise<{
    type: MediaType;
    genreId: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sort_by?: GenreSortValue;
  }>;
}
