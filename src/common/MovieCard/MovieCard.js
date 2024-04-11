import React from "react";
import "./MovieCard.style.css";
import { Badge, Row, Col } from "react-bootstrap";
import starIcon from "../../images/star.png";
import voteIcon from "../../images/vote.png";
import budgetIcon from "../../images/money-bag.png";
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

        <Row className="rating">
          <Col>
            <span>
              <img src={starIcon} alt="rating" className="icons" />
            </span>
            {movie?.vote_average}
          </Col>
          <Col>
            <span>
              <img src={voteIcon} alt="voting" className="icons" />
            </span>
            {movie?.vote_average}
          </Col>
          <Col>
            <span>
              <img src={budgetIcon} alt="budget" className="icons" />
            </span>
            {movie?.vote_average}
          </Col>
        </Row>
        <div className="release-date">
          {" "}
          <span className="fw-bold">Release: </span>
          {movie?.release_date}
        </div>
        <div className="overview">
          <span className="fw-bold">Overview: </span>
          {movie?.overview}
        </div>
        <div>{movie.adult ? <Badge bg="danger">18</Badge> : ""}</div>
      </div>
    </div>
  );
};

export default MovieCard;
