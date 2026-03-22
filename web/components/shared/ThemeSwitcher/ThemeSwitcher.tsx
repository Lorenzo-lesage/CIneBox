"use client";

import { useEffect, useState } from "react";

// Theme
import { useTheme } from "next-themes";

// Components
import { ThemeItem } from "./ThemeItem";

// UI
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";

// Icons
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";

export function ThemeSwitcher() {
  /*
  |---------------------------------------------------------------------------
  | Data
  |---------------------------------------------------------------------------
  */

  const { theme, setTheme } = useTheme();
  const shadowStyle = { filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.5))" };
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  /*
  |---------------------------------------------------------------------------
  | Render
  |---------------------------------------------------------------------------
  */

  return (
    <NavigationMenu delayDuration={0}>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* Nota: Ho rimosso la freccia di default di Shadcn per gestirla manualmente con l'ombra */}
          <NavigationMenuTrigger className="!bg-transparent border-none h-9 px-3 font-black text-foreground [&>svg]:hidden">
            <div className="flex items-center text-white">
              {/* Se currentTheme è undefined, siamo in fase di caricamento/SSR */}
              {currentTheme === undefined ? (
                <>
                  <Skeleton className="w-4 h-4 mr-2 rounded-sm" />
                  <Skeleton className="w-2 h-2 rounded-full" />
                </>
              ) : (
                <>
                  {currentTheme === "system" && (
                    <Monitor className="h-4 w-4 mr-2" style={shadowStyle} />
                  )}
                  {currentTheme === "light" && (
                    <Sun className="h-4 w-4 mr-2" style={shadowStyle} />
                  )}
                  {currentTheme === "dark" && (
                    <Moon className="h-4 w-4 mr-2" style={shadowStyle} />
                  )}
                  <ChevronDown
                    className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180 text-white"
                    style={{
                      filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.5))",
                    }}
                  />
                </>
              )}
            </div>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[150px] gap-1 p-2 bg-popover text-popover-foreground border rounded-md shadow-xl">
              <ThemeItem
                active={theme === "light"}
                onClick={() => setTheme("light")}
                icon={<Sun className="h-4 w-4" />}
                label="Light"
              />
              <ThemeItem
                active={theme === "dark"}
                onClick={() => setTheme("dark")}
                icon={<Moon className="h-4 w-4" />}
                label="Dark"
              />
              <ThemeItem
                active={theme === "system"}
                onClick={() => setTheme("system")}
                icon={<Monitor className="h-4 w-4" />}
                label="System"
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
