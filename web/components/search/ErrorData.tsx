"use clent";

// Icons
import { TriangleAlert } from "lucide-react";

export function ErrorData({ error }: { error: Error }) {
  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto px-4">
      <div className="rounded-lg border border-dashed p-12 flex flex-col items-center text-center bg-gradient-to-b from-transparent to-muted/20">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <TriangleAlert className="h-8 w-8 text-red-500" />
        </div>

        <h3 className="text-lg font-medium">
          Something went wrong
        </h3>

        <p className="text-sm text-muted-foreground max-w-[320px] mt-2">
          An error occurred while fetching data.
        </p>

        <p className="text-xs text-red-500 mt-4">
          {error.message}
        </p>
      </div>
    </div>
  );
}
