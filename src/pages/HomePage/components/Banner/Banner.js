import React from "react";
import "./Banner.style.css";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert, Badge } from "react-bootstrap";
import { useMovieGenreQuery } from "../../../../hooks/useMovieGenre";

const Banner = () => {
  const { data, isLoading, error, isError } = usePopularMoviesQuery();
  const { data: genreData } = useMovieGenreQuery();
  console.log(data);

  const showGenre = (genreIdList) => {
    if (!genreData) return [];

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

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
        <div className="genre">
          {showGenre(data?.results[0].genre_ids).map((id, i) => (
            <Badge key={i} bg="danger" className="mb-2 me-1">
              {id}
            </Badge>
          ))}
        </div>
        <p className="text-white banner-overview">
          {data?.results[0].overview}
        </p>
      </div>
    </div>
  );
};

export default Banner;
