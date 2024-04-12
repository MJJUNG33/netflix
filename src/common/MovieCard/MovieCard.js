import React from "react";
import "./MovieCard.style.css";
import { Badge, Row, Col } from "react-bootstrap";
import starIcon from "../../images/star.png";
import voteIcon from "../../images/vote.png";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="overlay text-start">
        <h4>{movie?.title}</h4>
        <div>
          {showGenre(movie.genre_ids).map((id, i) => (
            <Badge key={i} bg="danger" className="me-1">
              {id}
            </Badge>
          ))}
        </div>

        <Row className="rating ">
          <Col xs={4} md={6}>
            <span>
              <img src={starIcon} alt="rating" className=" icons" />
            </span>
            {movie?.vote_average}
          </Col>
          <Col xs={8} md={6}>
            <span>
              <img src={voteIcon} alt="voting" className=" icons" />
            </span>
            {movie?.vote_count}
          </Col>
        </Row>
        <Row xs={12}>
          <div className="release-date mt-1">
            <span className="fw-bold">Release: </span> {movie?.release_date}{" "}
          </div>
        </Row>

        <div className="overview">
          <div className="mt-2 pe-1">
            <span className="fw-bold">Overview: </span>
            {movie?.overview}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
