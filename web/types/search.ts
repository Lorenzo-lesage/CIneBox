import { ReactNode } from "react";
import { Movie } from "./movie";

export interface BeforeSearchProps {
  setQuery: (query: string) => void;
}

export interface InputSearchProps {
  query: string;
  setQuery: (query: string) => void;
}

export interface SearchResultsProps {
  query: string;
}


export interface SearchResultsProps {
  query: string;
  page: number;
  onPagination: (totalPages: number, currentPage: number, isPending: boolean) => ReactNode;
}

  export interface Pagination {
  current_page: number;
  total_pages: number;
  total_results: number;
}

export interface SearchMediaResponse {
  results: Movie[];
  pagination: Pagination;
}