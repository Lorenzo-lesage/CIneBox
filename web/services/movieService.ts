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
export const fetchMovieTrailer = async (id: number) => {
  const response = await axiosClient.get(apiConfig.endpoints.movieTrailer(id));
  return response.data;
};

/**
 * Fetch movies by genre
 * @param genreId 
 * @param page 
 * @returns 
 */
export const fetchGenreMovies = async (genreId: string | number, page: number = 1) => {
  const response = await axiosClient.get(apiConfig.endpoints.moviesByGenre(genreId, page));
  return response.data;
};