// Icons
import { Info, Heart } from "lucide-react";

// Types
import { MovieCardControlsProps } from "@/types/components";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Toast
import { toast } from "sonner";

export function MovieCardControls({
  isFavorited,
  toggleFavorite,
  movie,
}: MovieCardControlsProps) {
  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  */

  const handleToastFavorite = () => {
    if (isFavorited) {
      toast.success(`${movie.title} Removed from favorites`);
    } else {
      toast.success(`${movie.title} Added to favorites`);
    }
    toggleFavorite();
  };

  /*
  |--------------------------------------------------------------------------
  | Return
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <div className="cursor-pointer bg-black/50 p-1 rounded-full">
            <Info />
          </div>
        </TooltipTrigger>
        <TooltipContent className=" text-primary rounded-sm">
          See details
        </TooltipContent>
      </Tooltip>
      <div className="cursor-pointer bg-black/50 p-1 rounded-full">
        <Heart
          className={`${isFavorited ? "text-red-500 fill-red-500" : ""}`}
          onClick={handleToastFavorite}
        />
      </div>
    </>
  );
}
