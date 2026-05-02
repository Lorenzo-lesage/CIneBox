"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Components
import GenresGrid from "@/components/genres/GenresGrid";
import { SortBy } from "@/components/shared/SortBy";
import { PaginationMedia } from "@/components/shared/PaginationMedia";

// Types
import { GenrePageClientProps, GenreSortValue } from "@/types/genre";

// Options
import { sortOptions } from "@/lib/sortOptions";

export default function GenrePageClient({
  initialData,
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
    <main className="min-h-screen px-4 pb-8 md:px-10 lg:px-16">
      <section className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {genreLabel}
            </h1>

            <p className="text-sm text-zinc-400">
              {mediaLabel} • {initialData.total_results} results
            </p>
          </div>

          <SortBy
            currentSortBy={currentSortBy}
            handleSortChange={handleSortChange}
            sortOptions={sortOptions}
          />
        </div>

        {initialData.data.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-8 text-center">
            <p className="text-sm text-zinc-400">
              No results found for this genre.
            </p>
          </div>
        ) : (
          <GenresGrid
            initialData={initialData}
            type={type}
            isPending={isPending}
          />
        )}

        <PaginationMedia
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          isPending={isPending}
        />
      </section>
    </main>
  );
}
