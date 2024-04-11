import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sortBy, filterBy, id }) => {
  if (id) {
    return api.get(`/movie/${id}`);
  } else if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  } else {
    return api.get(
      `/movie/popular?page=${page}&sortBy=${sortBy}&filterBy=${filterBy}`
    );
  }
};

export const useSearchMovieQuery = ({
  keyword,
  page,
  sortBy,
  filterBy,
  id,
}) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page, sortBy, filterBy, id],
    queryFn: () => fetchSearchMovie({ keyword, page, sortBy, filterBy, id }),
    select: (result) => result.data,
  });
};
