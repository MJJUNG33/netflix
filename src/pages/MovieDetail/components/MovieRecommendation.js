import React from "react";
import { useMovieRecommendations } from "../../../hooks/useMovieRecommendations";
import "./MovieRecommendation.style.css";
import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../../common/MovieCard/MovieCard";

const MovieRecommendation = ({ id }) => {
  const {
    data: recommendationData,
    isLoading,
    isError,
    error,
  } = useMovieRecommendations({ id });

  if (isLoading) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Loading...</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Error: {error.message}</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row xs={12} md={3} xl={4} className="recommendation-movies">
        {recommendationData &&
          recommendationData.map((recommendation) => (
            <Col key={recommendation.id}>
              <MovieCard
                movie={recommendation}
                className="recommendation-movie-card"
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default MovieRecommendation;
