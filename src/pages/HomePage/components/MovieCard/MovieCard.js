import React from "react";
import "./MovieCard.style.css";
import { Badge } from "react-bootstrap";
import starIcon from "../../../../images/star.png";
const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h4>{movie?.title} </h4>
        <div className="genre">
          Genre:
          {movie?.genre_ids.map((id) => (
            <Badge bg="danger" className="ms-1">
              {" "}
              {id}
            </Badge>
          ))}
        </div>

        <div className="rating">
          <span>
            <img src={starIcon} alt="rating" className="star-icon" />
          </span>
          {movie?.vote_average}
        </div>
        <div className="release-date">Release: {movie?.release_date}</div>
        <div className="overview">Overview: {movie?.overview}</div>
        <div>{movie.adult ? <Badge bg="danger">18</Badge> : ""}</div>
      </div>
    </div>
  );
};

export default MovieCard;
