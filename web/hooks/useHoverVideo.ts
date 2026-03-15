import { useEffect, useState } from 'react';

export function useHoverVideo(
  movieId: number,
  activeVideoId: string | null,
  setActiveVideoId: (id: string | null) => void,
) {

  /*
  |--------------------------------------------------------------------------
  | Data
  |--------------------------------------------------------------------------
  */

  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const cardUniqueId = `card-${movieId}`;
  const isActive = activeVideoId === cardUniqueId;

  /*
  |--------------------------------------------------------------------------
  | Hook
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      timer = setTimeout(() => setShowVideo(true), 100);
    } else {
      setShowVideo(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  const toggleActive = () => setActiveVideoId(isActive ? null : cardUniqueId);

  /*
  |--------------------------------------------------------------------------
  | Returns
  |--------------------------------------------------------------------------
  */

  return { isHovered, setIsHovered, showVideo, isActive, toggleActive };
}
