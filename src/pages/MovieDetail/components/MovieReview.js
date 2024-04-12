import React from "react";
import "./MovieReview.style.css";
import { useMovieReviewQuery } from "../../../hooks/useMovieReview";
import { Col, Container, Row } from "react-bootstrap";

const MovieReview = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieReviewQuery({ id });

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
    <Container className="reviews">
      <Col className="text-start">
        <p className="mt-3 fw-bold reviews-title">Reviews</p>
        {data ? (
          data.map((review, index) => (
            <div className="mt-4 mb-5" key={index}>
              <p className="review-author fw-bold">{review.author}</p>
              <p className="review-content">{review.content}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </Col>
    </Container>
  );
};

export default MovieReview;
