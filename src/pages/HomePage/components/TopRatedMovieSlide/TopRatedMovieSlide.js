import React from "react";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieCard/MovieSliders/PopularMovieSlider";
import { responsive } from "../../../../constants/responsive";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";

const TopRatedMovieSlider = () => {
  const { data, isError, error, isLoading } = useTopRatedMoviesQuery();

  if (isLoading) {
    return (
      <h1>
        <span className="loader"></span> Loading...
      </h1>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider
        title="Top Rated Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovieSlider;
