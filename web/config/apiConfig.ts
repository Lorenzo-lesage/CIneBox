export const apiConfig = {
  endpoints: {
    home: (type: string, page: number) => `/home?type=${type}&page=${page}`,
    movieDetails: (id: number) => `/movies/${id}`,
    movieTrailer: (id: number) => `/movies/${id}/trailer`,
    genres: (type: string) => `/genres/${type}`,
    moviesByGenre: (genreId: string | number, page: number) =>
      `/genres/${genreId}/movies?page=${page}`,
  },
};
