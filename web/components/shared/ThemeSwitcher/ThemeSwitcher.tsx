"use client";

// Store
import { useThemeStore } from "@/store/useThemeStore";

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

// Icons
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";

export function ThemeSwitcher() {
  /*
  |---------------------------------------------------------------------------
  | Data
  |---------------------------------------------------------------------------
  */

  const { theme, setTheme } = useThemeStore();

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
              {theme === "system" && (
                <Monitor
                  className="h-4 w-4 mr-2"
                  style={{
                    filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.5))",
                  }}
                />
              )}
              {theme === "light" && (
                <Sun
                  className="h-4 w-4 mr-2"
                  style={{
                    filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.5))",
                  }}
                />
              )}
              {theme === "dark" && (
                <Moon
                  className="h-4 w-4 mr-2"
                  style={{
                    filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.5))",
                  }}
                />
              )}
              <ChevronDown
                className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180 text-white"
                style={{
                  filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.5))",
                }}
              />
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
