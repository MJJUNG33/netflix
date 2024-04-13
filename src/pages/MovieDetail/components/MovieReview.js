import React, { useState } from "react";
import "./MovieReview.style.css";
import { useMovieReviewQuery } from "../../../hooks/useMovieReview";
import { Button, Col, Container, Row } from "react-bootstrap";

const MovieReview = ({ id }) => {
  const [expanded, setExpanded] = useState(false);
  const { data, isLoading, isError, error } = useMovieReviewQuery({ id });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

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
            <div className="mt-4 movie-review" key={index}>
              <p className="review-author fw-bold">{review.author}</p>

              {expanded ? (
                <p className="review-content">{review.content}</p>
              ) : (
                <p className="review-content">{review.content.slice(0, 300)}</p>
              )}

              {review.content.length > 300 && (
                <Button
                  variant="link"
                  className="review-show"
                  onClick={toggleExpand}
                >
                  {expanded ? "Show less" : "Show more"}
                </Button>
              )}
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
