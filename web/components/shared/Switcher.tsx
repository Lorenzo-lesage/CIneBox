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
    <div className="flex gap-4 px-10 md:px-20 mb-10">
      <Button
        className={`rounded-full px-8 transition-all ${type === "movie" ? "bg-red-600 hover:bg-red-700" : "bg-zinc-800"}`}
        onClick={() => setType("movie")}
      >
        Movies
      </Button>
      <Button
        className={`rounded-full px-8 transition-all ${type === "tv" ? "bg-red-600 hover:bg-red-700" : "bg-zinc-800"}`}
        onClick={() => setType("tv")}
      >
        TV Series
      </Button>
    </div>
  );
}
