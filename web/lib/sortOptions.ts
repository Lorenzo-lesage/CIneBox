import { GenreSortValue } from "@/types/genre";

export const sortOptions: Array<{ value: GenreSortValue; label: string }> = [
  { value: "popular", label: "Most Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "latest", label: "Latest Release" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title_az", label: "Title A-Z" },
  { value: "title_za", label: "Title Z-A" },
];