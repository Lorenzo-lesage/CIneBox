import { Info, Heart } from "lucide-react";

export function MovieCardControls({
  isFavorited,
  toggleFavorite,
}: {
  isFavorited: boolean;
  toggleFavorite: () => void;
}) {
  return (
    <div className="absolute top-0 right-[50%] transform translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
      <div className="cursor-pointer bg-black/50 p-1 rounded-full">
        <Info />
      </div>
      <div className="cursor-pointer bg-black/50 p-1 rounded-full">
        <Heart
          className={`${isFavorited ? "text-red-500 fill-red-500" : ""}`}
          onClick={toggleFavorite}
        />
      </div>
    </div>
  );
}