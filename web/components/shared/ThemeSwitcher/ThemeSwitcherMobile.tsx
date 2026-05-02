"use client";

// Theme
import { useTheme } from "next-themes";

// UI
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Icons
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeSwitcherMobile() {
  /*
  |---------------------------------------------------------------------------
  | Data
  |---------------------------------------------------------------------------
  */
  const { theme, setTheme } = useTheme();

  /*
  |---------------------------------------------------------------------------
  | Render
  |---------------------------------------------------------------------------
  */
  return (
    <div className="px-2">
      <Select value={theme} onValueChange={(val) => setTheme(val)}>
        <SelectTrigger className="bg-transparent font-bold [&>svg]:hidden">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>

        <SelectContent
          side="bottom"
          className="w-11 min-w-[2.75rem] p-0 [&_.absolute]:hidden"
        >
          <SelectGroup>
            <SelectItem
              value="light"
              className="pl-2 pr-2 justify-center cursor-pointer"
            >
              <Sun className="h-4 w-4" />
            </SelectItem>

            <SelectItem
              value="dark"
              className="pl-2 pr-2 justify-center cursor-pointer"
            >
              <Moon className="h-4 w-4" />
            </SelectItem>

            <SelectItem
              value="system"
              className="pl-2 pr-2 justify-center cursor-pointer"
            >
              <Monitor className="h-4 w-4" />
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
