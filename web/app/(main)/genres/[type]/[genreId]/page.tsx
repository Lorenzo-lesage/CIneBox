// Fetch
import { fetchPaginatedGenreMedia } from "@/services/movieService";

// Components
import GenrePageClient from "@/components/genres/GenrePageClient";

// Types
import { MediaType } from "@/types/movie";

interface GenrePageProps {
  params: Promise<{
    type: MediaType;
    genreId: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sort_by?: string;
  }>;
}

export default async function Page({
  params,
  searchParams,
}: GenrePageProps) {
  /*
  | -------------------------------------------------------------------------
  | Data
  |-------------------------------------------------------------------------
  */

  const { type, genreId } = await params;
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page ?? "1");
  const sortBy = resolvedSearchParams.sort_by ?? "popular";

  /*
  | -------------------------------------------------------------------------
  | Fetch SSR
  |-------------------------------------------------------------------------
  */

  const initialData = await fetchPaginatedGenreMedia(
    genreId,
    type,
    page,
    sortBy,
  );

  /*
  | -------------------------------------------------------------------------
  | Render
  |-------------------------------------------------------------------------
  */

  return (
    <GenrePageClient
      initialData={initialData}
      genreId={genreId}
      type={type}
      initialSortBy={sortBy}
    />
  );
}
