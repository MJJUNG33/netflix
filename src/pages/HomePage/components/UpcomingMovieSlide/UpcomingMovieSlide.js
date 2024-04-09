import React from "react";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieCard/MovieSliders/PopularMovieSlider";
import { responsive } from "../../../../constants/responsive";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";

const UpcomingMoviesSlide = () => {
  const { data, isError, error, isLoading } = useUpcomingMoviesQuery();

  if (isLoading) {
    return (
      <h1>
        <span class="loader"></span> Loading...
      </h1>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider
        title="Upcoming Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMoviesSlide;
