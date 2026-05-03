import Link from "next/link";
import { cn } from "@/lib/utils";

// Components
import { MovieCard } from "@/components/shared/Card/MovieCard";

// UI
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Icons
import { ChevronRight } from "lucide-react";

// Types
import { MovieRowProps } from "@/types/components";

export function MovieRow({
  title,
  movies,
  genreId,
  rowStyle = "default",
  type,
  isLoading,
}: MovieRowProps) {
  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-2 py-4 md:py-10">
      <div className="relative">
        <Carousel
          className="w-full group/row"
          opts={{
            dragFree: true,
          }}
        >
          <div className="flex items-center justify-between px-4 md:px-10">
            {genreId ? (
              <Link
                href={`/genre/${genreId}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity hover:underline group"
                style={{ textShadow: "0px 0px 2px rgb(32, 3, 3)" }}
              >
                <ChevronRight className="h-5 w-5 group-hover:translate-x-40 transition-all duration-150" />
                <h2 className="text-xl md:text-2xl font-semibold capitalize tracking-tight">
                  {title}
                </h2>
              </Link>
            ) : (
              <h2 className="text-xl md:text-2xl font-semibold capitalize tracking-tight">
                {title}
              </h2>
            )}

            <div className="items-center gap-2 bg-muted/20 rounded-lg hidden md:flex">
              <CarouselPrevious
                className="
                static translate-x-0 translate-y-0
                h-9 w-9
                rounded-lg
                border border-border/30
                bg-muted
                text-muted-foreground
                hover:bg-background
                hover:border-border/60
                hover:text-foreground
                hover:scale-105
                active:scale-95
                transition-all duration-150
                cursor-pointer
              "
              />
              <CarouselNext
                className="
                static translate-x-0 translate-y-0
                h-9 w-9
                rounded-lg
                border border-border/30
                bg-muted
                text-muted-foreground
                hover:bg-background
                hover:border-border/60
                hover:text-foreground
                hover:scale-105
                active:scale-95
                transition-all duration-150
                cursor-pointer
              "
              />
            </div>
          </div>
          <CarouselContent className="pt-4 px-4 md:px-10 flex items-center gap-1 hover:z-10 relative">
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className={cn(
                  "basis-[40%] sm:basis-[45%] md:basis-[33%] lg:basis-[24%] xl:basis-[20%] pl-0",
                )}
              >
                {isLoading ? (
                  <div className="h-45 w-full animate-pulse rounded-md bg-zinc-800/40" />
                ) : (
                  <MovieCard movie={movie} rowStyle={rowStyle} type={type} />
                )}
              </CarouselItem>
            ))}

            {genreId && (
              <CarouselItem
                className={cn(
                  "basis-[40%] sm:basis-[40%] md:basis-[30%] lg:basis-[20%] xl:basis-[10%] pl-3 ml-3",
                )}
              >
                <Link
                  href={`/genres/${type}/${genreId}`}
                  className="group h-45 block"
                >
                  <div
                    className="
        h-full rounded-lg
        border border-dashed border-border
        bg-background/40
        group-hover:border-red-500/70
        group-hover:bg-background
        transition-all duration-200
        flex flex-col items-center justify-center gap-3
      "
                  >
                    <div
                      className="
          p-3 rounded-full
          bg-background border border-border/40
          group-hover:bg-red-500 group-hover:border-red-500
          transition-all duration-200
        "
                    >
                      <ChevronRight
                        className="
            w-5 h-5
            text-muted-foreground
            group-hover:text-white
            transition-colors duration-200
          "
                      />
                    </div>

                    <span
                      className="
          text-sm font-medium
          text-muted-foreground/60
          group-hover:text-foreground
          transition-colors duration-200
        "
                    >
                      See more
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            )}
            <div className="w-0 md:w-10 flex-shrink-0" />
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
