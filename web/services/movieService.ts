import axiosClient from "../lib/axiosClient";
import { apiConfig } from "../config/apiConfig";

/**
 * Fetch Home page data
 * @param type
 * @param page
 * @returns
 */
export const fetchHomeData = async (type: "movie" | "tv", page: number = 1) => {
  const response = await axiosClient.get(apiConfig.endpoints.home(type, page));
  return response.data;
};

/**
 * Fetch movie trailer
 * @param id
 * @returns
 */
export const fetchMediaTrailer = async (id: number, type: "movie" | "tv") => {
  const response = await axiosClient.get(
    apiConfig.endpoints.mediaTrailer(id, type),
  );
  return response.data;
};

/**
 * Fetch movies by genre
 * @param genreId
 * @param page
 * @returns
 */
export const fetchGenreMedia = async (
  genreId: string | number,
  type: "movie" | "tv",
  page: number = 1,
) => {
  const response = await axiosClient.get(
    apiConfig.endpoints.mediasByGenre(genreId, type, page),
  );
  return response.data;
};

/**
 * Fetch paginated media by genre
 * @param genreId
 * @param type
 * @param page
 * @param sortBy
 * @returns
 */
export const fetchPaginatedGenreMedia = async (
  genreId: string | number,
  type: "movie" | "tv",
  page: number = 1,
  sortBy: string = "popular",
) => {
  const response = await axiosClient.get(
    apiConfig.endpoints.paginatedMediasByGenre(type, genreId, page, sortBy),
  );

  return response.data;
};
