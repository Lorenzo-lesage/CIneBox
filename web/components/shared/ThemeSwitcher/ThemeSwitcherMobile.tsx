"use client";

// Store
import { useThemeStore } from "@/store/useThemeStore";

// Components
import { ThemeItem } from "./ThemeItem";

// UI
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Icons
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeSwitcherMobile() {
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
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full border-none"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {theme === "system" && (
              <div className="gap-2 flex items-center">
                <p>System</p>
                <Monitor className="h-4 w-4 mr-2" />
              </div>
            )}
            {theme === "light" && (
              <div className="gap-2 flex items-center">
                <p>Light</p>
                <Sun className="h-4 w-4 mr-2" />
              </div>
            )}
            {theme === "dark" && (
              <div className="gap-2 flex items-center">
                <p>Dark</p>
                <Moon className="h-4 w-4 mr-2" />
              </div>
            )}
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
