import { useState, useEffect } from "react";

export function useRandomHero<T extends { id: number | string }>(
  list?: T[]
) {
  const [hero, setHero] = useState<T | null>(() => {
    if (!list || list.length === 0) return null;
    const index = Math.floor(Math.random() * list.length);
    return list[index];
  });

  useEffect(() => {
    if (!list || list.length === 0) return;

    const handle = setTimeout(() => {
      setHero((prevHero) => {
        if (list.length === 1) return list[0];

        let newHero;
        do {
          newHero = list[Math.floor(Math.random() * list.length)];
        } while (prevHero && newHero.id === prevHero.id);

        return newHero;
      });
    });

    return () => clearTimeout(handle);
  }, [list]);

  return hero;
}