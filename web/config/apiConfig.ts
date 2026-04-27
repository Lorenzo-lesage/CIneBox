export const apiConfig = {
  endpoints: {
    home: (type: string, page: number) => `/home?type=${type}&page=${page}`,
    mediaDetails: (id: number, type: string) => `/${type}/${id}`,
    mediaTrailer: (id: number, type: string) => `/${type}/${id}/trailer`,
    genres: (type: string) => `/genres/${type}`,
    mediasByGenre: (genreId: string | number, type: string, page: number) =>
      `/genres/${genreId}/${type}?page=${page}`,
    paginatedMediasByGenre: (
      type: string,
      genreId: string | number,
      page: number,
      sortBy: string,
    ) => `/genres/${type}/${genreId}/paginated?page=${page}&sort_by=${sortBy}`,
  },
};
