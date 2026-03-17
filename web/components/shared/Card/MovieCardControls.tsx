// Icons
import { Info, Heart } from "lucide-react";

// Types
import { MovieCardControlsProps } from "@/types/components";

export function MovieCardControls({
  isFavorited,
  toggleFavorite,
}: MovieCardControlsProps) {
  return (
    <>
      <div className="cursor-pointer bg-black/50 p-1 rounded-full">
        <Info />
      </div>
      <div className="cursor-pointer bg-black/50 p-1 rounded-full">
        <Heart
          className={`${isFavorited ? "text-red-500 fill-red-500" : ""}`}
          onClick={toggleFavorite}
        />
      </div>
    </>
  );
}
