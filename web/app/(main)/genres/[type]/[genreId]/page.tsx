// Fetch
import { fetchPaginatedGenreMedia } from "@/services/movieService";

// Components
import GenrePageClient from "@/components/genres/GenrePageClient";

// Types
import { GenrePageProps } from "@/types/genre";

export default async function Page({ params, searchParams }: GenrePageProps) {
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
    <div className="md:mt-20">
      <GenrePageClient
        initialData={initialData}
        type={type}
        initialSortBy={sortBy}
      />
    </div>
  );
}
