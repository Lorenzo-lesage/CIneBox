"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Components
import GenresGrid from "@/components/genres/GenresGrid";

// UI
import { Button } from "@/components/ui/button";

// Types
import { MediaType, Movie } from "@/types/movie";

type GenreSortValue =
  | "popular"
  | "top_rated"
  | "latest"
  | "newest"
  | "oldest"
  | "title_az"
  | "title_za";

interface GenreMetadata {
  id: number;
  type: MediaType;
  key: string | null;
  label: string | null;
}

interface GenrePageResponse {
  data: Movie[];
  current_page: number;
  total_pages: number;
  total_results: number;
  genre: GenreMetadata;
}

interface GenrePageClientProps {
  initialData: GenrePageResponse;
  genreId: string;
  type: MediaType;
  initialSortBy: GenreSortValue;
}

const sortOptions: Array<{ value: GenreSortValue; label: string }> = [
  { value: "popular", label: "Most Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "latest", label: "Latest Release" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title_az", label: "Title A-Z" },
  { value: "title_za", label: "Title Z-A" },
];

export default function GenrePageClient({
  initialData,
  genreId,
  type,
  initialSortBy,
}: GenrePageClientProps) {
  /*
  | -------------------------------------------------------------------------
  | Data
  |-------------------------------------------------------------------------
  */

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentPage = initialData.current_page;
  const currentSortBy =
    (searchParams.get("sort_by") as GenreSortValue | null) ?? initialSortBy;
  const totalPages = initialData.total_pages;
  const genreLabel = initialData.genre.label ?? "Genre";
  const mediaLabel = type === "movie" ? "Movies" : "TV Series";

  /*
  | -------------------------------------------------------------------------
  | Methods
  |-------------------------------------------------------------------------
  */

  const buildQueryString = (values: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(values).forEach(([key, value]) => {
      params.set(key, value);
    });

    return params.toString();
  };

  const handleSortChange = (value: string) => {
    startTransition(() => {
      const queryString = buildQueryString({
        sort_by: value,
        page: "1",
      });

      router.push(`${pathname}?${queryString}`);
    });
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const queryString = buildQueryString({
        sort_by: currentSortBy,
        page: String(page),
      });

      router.push(`${pathname}?${queryString}`);
    });
  };

  /*
  | -------------------------------------------------------------------------
  | Render
  |-------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen px-4 py-10 md:px-10 lg:px-16">
      <section className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              {mediaLabel}
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {genreLabel}
            </h1>

            <p className="text-sm text-zinc-400">
              Genre ID: {genreId} • {initialData.total_results} results
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-72">
            <label
              htmlFor="sort_by"
              className="text-sm font-medium text-zinc-300"
            >
              Sort by
            </label>

            <select
              id="sort_by"
              value={currentSortBy}
              onChange={(event) => handleSortChange(event.target.value)}
              className="h-11 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-white outline-none focus:border-red-600"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {initialData.data.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-8 text-center">
            <p className="text-sm text-zinc-400">
              No results found for this genre.
            </p>
          </div>
        ) : (
            <GenresGrid initialData={initialData} type={type} />
        )}

        <div className="flex items-center justify-center gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isPending}
          >
            Previous
          </Button>

          <span className="text-sm text-zinc-400">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isPending}
          >
            Next
          </Button>
        </div>
      </section>
    </main>
  );
}
