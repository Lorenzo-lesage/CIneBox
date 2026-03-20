import { Movie } from "./movie";

export interface HeroBannerProps {
  movie: {
    id: string | number;
    title?: string;
    name?: string;
    backdrop_path?: string;
    overview?: string;
  };
  trailerKey?: string;
  openTrailer: boolean;
  setOpenTrailer: (open: boolean) => void;
}

export interface HeroTrailerModalProps {
  videoKey: string;
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
