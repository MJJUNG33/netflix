import React from "react";
import "./Banner.style.css";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";

const Banner = () => {
  const { data, isLoading, error, isError } = usePopularMoviesQuery();

  if (isLoading) {
    return (
      <div>
        <h1>
          <span className="loader"></span> Loading...
        </h1>
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path})`,
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1 className="text-white banner-title">{data?.results[0].title}</h1>
        <p className="text-white banner-overview">
          {data?.results[0].overview}
        </p>
      </div>
    </div>
  );
};

export default Banner;
