"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  /*
  |--------------------------------------------------------------------------
  | Hooks
  |--------------------------------------------------------------------------
  */
 
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
