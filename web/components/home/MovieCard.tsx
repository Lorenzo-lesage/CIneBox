"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";

// UI
import { Card, CardContent } from "@/components/ui/card";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  trailer_url?: string;
}

let activeVideoId: number | null = null;

export function MovieCard({ movie }: { movie: Movie }) {
  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dynamicTrailerKey, setDynamicTrailerKey] = useState<string | null>(
    null,
  );

  /*
  |--------------------------------------------------------------------------
  | Hooks
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isHovered) {
      timer = setTimeout(async () => {
        // Se non abbiamo ancora la chiave, la chiediamo a Laravel
        if (!dynamicTrailerKey) {
          try {
            const res = await fetch(
              `http://localhost:8000/api/v1/movies/${movie.id}/trailer`,
            );
            const data = await res.json();
            if (data.trailer_key) {
              setDynamicTrailerKey(data.trailer_key);
              setShowVideo(true);
            }
          } catch (e) {
            console.error("Trailer error");
          }
        } else {
          setShowVideo(true);
        }
      }, 100);
    } else {
      setShowVideo(false);
    }

    return () => clearTimeout(timer);
  }, [isHovered, movie.id, dynamicTrailerKey]);

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <Card
      className="h-80 bg-transparent border-none group cursor-pointer overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent
        className={`p-0 aspect-ratio-16/9 relative w-full h-full rounded-md {${showVideo ? "overflow-visible" : "overflow-hidden"}}`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w780${isMobile ? movie.poster_path : movie.backdrop_path || movie.poster_path}`}
          alt={movie.title || movie.name || "Poster"}
          fill
          sizes="100%"
          className={`object-cover transition-opacity duration-500 ${
            showVideo ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* 2. Player Video: lo mettiamo in un contenitore con z-index alto */}
        {showVideo && (
          <div className="absolute inset-0 z-20">
            <div className="relative h-full">
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${dynamicTrailerKey}`}
                playing
                controls
                muted
                width="100%"
                height="100%"
              />
              <div className="absolute top-[-10px] right-[50%] text-white z-21 transform translate-x-1/2">
                <p className="p-2 bg-red-600 rounded">Info</p>
              </div>
            </div>
          </div>
        )}

        {/* Overlay con info al passaggio del mouse */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white font-bold text-sm truncate">
            {movie.title || movie.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-yellow-400 text-xs">
              ★ {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
