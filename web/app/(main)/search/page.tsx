"use client";

import { useState } from "react";

// Hooks
import { useDebounce } from "@/hooks/useDebounce";

// Components
import { BeforeSearch } from "@/components/search/BeforeSearch";
import { InputSearch } from "@/components/search/InputSearch";
import { SearchResults } from "@/components/search/SearchResults";
import { PaginationMedia } from "@/components/shared/PaginationMedia";

export default function Page() {
  /*
  | -------------------------------------------------------------------------
  | State
  |-------------------------------------------------------------------------
  */
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 300);

  /*
  | -------------------------------------------------------------------------
  | Handlers
  |-------------------------------------------------------------------------
  */

  /**
   * Updates the current page and scrolls to top for better UX.
   */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Resets page to 1 when a new search query is typed.
   */
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1); 
  };

  /*
  | -------------------------------------------------------------------------
  | Render
  |-------------------------------------------------------------------------
  */

  return (
    <div className="md:mt-20">
      <div className="max-w-3xl mx-auto px-4 mt-10">
        {/* Search Header */}
        <div className="mb-8 space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight">
            Find your movie or tv series
          </h1>
          <p className="text-muted-foreground">
            Trova file, utenti o documenti in un colpo solo.
          </p>
        </div>

        <InputSearch query={query} setQuery={handleQueryChange} />
      </div>

      {!query ? (
        <BeforeSearch setQuery={setQuery} />
      ) : (
        <div className="min-h-screen px-4 pb-8 md:px-10 lg:px-16">
          <SearchResults
            query={debouncedQuery}
            page={page}
            onPagination={(totalPages, currentPage, isPending) => (
              <PaginationMedia
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                isPending={isPending}
              />
            )}
          />
        </div>
      )}
    </div>
  );
}
