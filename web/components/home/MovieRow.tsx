import Link from "next/link";

// Components
import { MovieCard } from "../shared/Card/MovieCard";

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

export function MovieRow({ title, movies, genreId }: MovieRowProps) {
  /*
  
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-2 py-4">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold px-4 md:px-10 capitalize tracking-tight">
          {title}
        </h2>
      </div>

      <div className="relative">
        <Carousel className="w-full group/row">
          <CarouselContent className="pt-4 px-4 md:px-10 flex items-center ">
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className={`
                  basis-[40%]
                  sm:basis-[45%]
                  md:basis-[33%]
                  lg:basis-[24%]
                  xl:basis-[20%]
                  pl-2
                `}
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}

            {genreId && (
              <CarouselItem
                className="
                  basis-[40%]
                  sm:basis-[40%]
                  md:basis-[30%]
                  lg:basis-[20%]
                  xl:basis-[10%]
                  pl-3
                  ml-3
                "
              >
                <Link href={`/genres/${genreId}`} className="group h-45 block">
                  <div className="h-full bg-zinc-900/40 rounded-md border-2 border-dashed border-zinc-800 group-hover:border-red-600 group-hover:bg-zinc-900 transition-all flex flex-col items-center justify-center gap-3">
                    <div className="p-3 rounded-full bg-zinc-800 group-hover:bg-red-600 transition-colors">
                      <ChevronRight className="w-6 h-6 text-white" />
                    </div>

                    <span className="text-sm font-bold text-zinc-500 group-hover:text-white">
                      See more
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            )}
            <div className="w-0 md:w-10 flex-shrink-0" />
          </CarouselContent>

          {/* Controls */}
          <CarouselPrevious
            className="
              hidden md:flex
              -left-6
              opacity-0
             group-hover/row:opacity-100
              transition
              cursor-pointer
            "
          />

          <CarouselNext
            className="
              hidden md:flex
              right-6
              opacity-0
              group-hover/row:opacity-100
              transition
              cursor-pointer
            "
          />
        </Carousel>
      </div>
    </div>
  );
}
