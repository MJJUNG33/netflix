import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sortBy, filterBy }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    : api.get(
        `/movie/popular?page=${page}&sortBy=${sortBy}&filterBy=${filterBy}`
      );
};

export const useSearchMovieQuery = ({ keyword, page, sortBy, filterBy }) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page, sortBy, filterBy],
    queryFn: () => fetchSearchMovie({ keyword, page, sortBy, filterBy }),
    select: (result) => result.data,
  });
};
