import { cn } from "@/lib/utils";

// Icons
import { Check } from "lucide-react";

// Types
import { ThemeItemProps } from "@/types/components";

export function ThemeItem({ active, onClick, icon, label }: ThemeItemProps) {
  return (
    <li
      onClick={onClick}
      className={cn(
        "flex items-center justify-between px-2 py-1.5 text-sm rounded-sm cursor-pointer transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        active ? "bg-accent/50 font-medium" : "opacity-70",
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
      {active && <Check className="h-3.5 w-3.5 text-red-500" />}
    </li>
  );
}
