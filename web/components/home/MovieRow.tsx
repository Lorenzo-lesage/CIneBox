import Link from "next/link";

// Components
import { MovieCard } from "./MovieCard";

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

interface MovieRowProps {
  title: string;
  movies: any[];
  genreId?: string | number;
}

export function MovieRow({ title, movies, genreId }: MovieRowProps) {
  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-4 py-4">
      <h2 className="text-2xl font-semibold px-4 md:px-10 capitalize tracking-tight">
        {title}
      </h2>
      <div className="my-5">
        <Carousel className="w-full">
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}

            {/* 2. L'ultima slide speciale */}
            {genreId && (
              <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                <Link
                  href={`/genres/${genreId}`}
                  className="group h-full block"
                >
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
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
