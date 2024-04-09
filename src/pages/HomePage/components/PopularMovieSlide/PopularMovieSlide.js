import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";
import "./PopularMovieSlide.style.css";
import MovieSlider from "../../../../common/MovieCard/MovieSliders/PopularMovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isError, error, isLoading } = usePopularMoviesQuery();

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
        title="Popular Movies"
        movies={data.results}
        responsive={responsive}
        className="movie-slider"
      />
    </div>
  );
};

export default PopularMovieSlide;
