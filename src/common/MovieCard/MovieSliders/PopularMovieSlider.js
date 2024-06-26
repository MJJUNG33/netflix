import React from "react";
import "./MovieSlider.style.css";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard";

const PopularMovieSlider = ({ title, movies, responsive, deviceType }) => {
  return (
    <div>
      {" "}
      <h3 className="carousel-title">{title}</h3>
      <Carousel
        infinite={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
        showDots={true}
        swipeable={deviceType !== "desktop" ? true : false}
      >
        {movies.map((movie, i) => (
          <MovieCard movie={movie} key={i} />
        ))}
      </Carousel>
    </div>
  );
};

export default PopularMovieSlider;
