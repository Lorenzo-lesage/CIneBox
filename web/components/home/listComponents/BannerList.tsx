import Image from "next/image";

// Types
import { FeaturedMovie } from "@/types/components";

export function BannerList({ featuredMovie }: FeaturedMovie) {
  return (
    <section className="relative my-10 h-[40vh] w-full pr-4 md:pr-20">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-transparent to-background/80" />
      <Image
        alt={featuredMovie.title || featuredMovie.name || "Featured movie"}
        src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
        className="h-full w-full object-cover opacity-50"
        fill
      />
      <div className="absolute bottom-10 left-10 z-20 max-w-md">
        <span className="text-red-600 font-bold uppercase text-xs tracking-[0.3em]">
          Must Watch
        </span>
        <h3 className="text-4xl font-black">
          {featuredMovie.title || featuredMovie.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
          {featuredMovie.overview}
        </p>
      </div>
    </section>
  );
}
