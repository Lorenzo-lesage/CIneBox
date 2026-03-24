import { Movie } from "./movie";

export interface HomeDataResponse {
  hero: Movie[];
  popular: Movie[];
  hasMore: boolean;
  nextPage: number | null;
  // Index Signature: permette di avere chiavi dinamiche come 'action', 'comedy', ecc.
  [key: string]: any | Movie[] | boolean | number | null;
}

export interface HomePageClientProps {
  initialMovieData: HomeDataResponse;
  initialTvData: HomeDataResponse;
  initialMovieTrailerData: { trailer_key: string | null};
  initialTvTrailerData: { trailer_key: string | null };
}

export interface HomeGenreSection {
  key: string;
  genreId: string | number;
  label: string;
  data: Movie[];
}

export interface ProcessedHomeData {
  heroList: Movie[];
  popularList: Movie[];
  topRatedList: Movie[];
  genres: HomeGenreSection[];
}

export interface HomeListProps {
  processedData: ProcessedHomeData;
  isFetchingNextPage: boolean;
}

export interface HeroBannerProps {
  movie: {
    id: string | number;
    title?: string;
    name?: string;
    backdrop_path?: string;
    overview?: string;
  };
  trailerKey: string | null;
  openTrailer: boolean;
  setOpenTrailer: (open: boolean) => void;
}

export interface HeroTrailerModalProps {
  videoKey: string | null;
  setOpenTrailer: (open: boolean) => void;
}

export interface MovieRowProps {
  title: string;
  movies: Movie[];
  genreId?: string | number;
  scope?: "movie" | "top-rated";
}

export interface MovieCardControlsProps {
  isFavorited: boolean;
  toggleFavorite: () => void;
  movie: Movie;
}

export interface MovieCardProps {
  movie: Movie;
  scope?: "movie" | "top-rated";
}

export interface MovieCardPlayerProps {
  trailerKey: string;
  movie: Movie;
  showVideo: boolean;
  isActive: boolean;
  toggleActive: () => void;
  playerRef: React.RefObject<HTMLVideoElement | null>;
  scope?: "movie" | "top-rated";
}

export interface MovieCardTextProps {
  movie: Pick<Movie, "title" | "name" | "vote_average" | "popularity">;
}

export interface ThemeItemProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}
