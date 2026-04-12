"use client";
import React from "react";

// UI
import { Button } from "@/components/ui/button";

interface SwitcherProps {
  type: "movie" | "tv";
  setType: (type: "movie" | "tv") => void;
}

export function Switcher({ type, setType }: SwitcherProps) {
  return (
    <div className="flex px-10  md:px-20 mb-10">
      <Button
        className={`rounded-none px-16 transition-all text-primary text-xl font-bold border-t-0 border-l-0 border-r-0 ${type === "movie" ? "bg-transparent border-red-600 border-b-3 hover:bg-transparent text-red-600 font-black" : "bg-transparent hover:bg-transparent cursor-pointer hover:text-red-600 transition-all duration-200 hover:ease-in-out hover:scale-105 hover:transform hover:-translate-y-1"}`}
        onClick={() => setType("movie")}
      >
        Movies
      </Button>
      <Button
        className={`rounded-none px-16 transition-all text-primary text-xl font-bold border-t-0 border-l-0 border-r-0 ${type === "tv" ? "bg-transparent border-red-600 border-b-3 hover:bg-transparent text-red-600 font-black" : "bg-transparent hover:bg-transparent cursor-pointer hover:text-red-600 transition-all duration-200 hover:ease-in-out hover:scale-105 hover:transform hover:-translate-y-1"}`}
        onClick={() => setType("tv")}
      >
        TV Series
      </Button>
    </div>
  );
}
