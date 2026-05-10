"use clent";

// Icons
import { Sparkles, History } from "lucide-react";

// Types
import { BeforeSearchProps } from "@/types/search";

export function BeforeSearch({ setQuery }: BeforeSearchProps) {
  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto px-4">
      <div className="rounded-lg border border-dashed p-12 flex flex-col items-center text-center bg-gradient-to-b from-transparent to-muted/20">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-red-500 animate-pulse" />
        </div>
        <h3 className="text-lg font-medium">Nothing to see here</h3>
        <p className="text-sm text-muted-foreground max-w-[280px] mt-2">
          Type something in the search box above to get started.
        </p>

        <div className="mt-8 w-full">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Suggested
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Interstellar",
              "Inception",
              "The Dark Knight",
              "Dune",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-xs transition-colors border"
              >
                <History className="h-3 w-3" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
