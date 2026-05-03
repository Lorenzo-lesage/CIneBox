"use client";

// Components
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// type
import { SortProps } from "@/types/components";

export function SortBy({
  currentSortBy,
  handleSortChange,
  sortOptions,
}: SortProps) {
  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="flex flex-col gap-2 w-full md:w-72">
      <Select
        value={currentSortBy}
        onValueChange={(value) => handleSortChange(value)}
      >
        <SelectTrigger className="w-full md:w-[220px] rounded-lg">
          <SelectValue placeholder={currentSortBy} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="absolute top-[-2.5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg"
        >
          <SelectGroup>
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="cursor-pointer rounded-lg"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
