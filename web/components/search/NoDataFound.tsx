"use clent";

// Icons
import { SearchX } from "lucide-react";

export function NoDataFound() {
  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto px-4">
      <div className="rounded-lg border border-dashed p-12 flex flex-col items-center text-center bg-gradient-to-b from-transparent to-muted/20">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <SearchX className="h-8 w-8 text-red-500" />
        </div>

        <h3 className="text-lg font-medium">No results found</h3>

        <p className="text-sm text-muted-foreground max-w-[280px] mt-2">
          We couldn&apos;t find anything matching your search. Try another title
          or actor.
        </p>
      </div>
    </div>
  );
}
