import React from "react";
import "./MoviePage.style.css";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";

//routes:
// 1. When click on navbar => show popular movies
// 2. Search keyword => show movies related to keyword.

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });
  console.log(data);
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
    <Container>
      <Row>
        <Col lg={4} xs={12}></Col>
        <Col lg={8} xs={12}>
          <Row>
            {" "}
            {data?.results.map((movie, i) => (
              <Col key={i} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
