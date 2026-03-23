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
}

export interface MovieCardControlsProps {
  isFavorited: boolean;
  toggleFavorite: () => void;
  movie: Movie;
}

export interface MovieCardPlayerProps {
  trailerKey: string;
  movie: Movie;
  showVideo: boolean;
  isActive: boolean;
  toggleActive: () => void;
  playerRef: React.RefObject<HTMLVideoElement | null>;
}

export interface MovieCardTextProps {
  movie: Pick<Movie, "title" | "name" | "vote_average">;
}

export interface ThemeItemProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}
