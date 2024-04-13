import React, { useEffect, useState } from "react";
import "./ReviewRecommendTab.style.css";
import { Tabs, Tab } from "react-bootstrap";
import MovieReview from "./MovieReview";
import { useMovieReviewQuery } from "../../../hooks/useMovieReview";
import { useMovieRecommendationsQuery } from "../../../hooks/useMovieRecommendations";
import MovieRecommendation from "./MovieRecommendation";

const ReviewRecommendTab = ({ id }) => {
  const [key, setKey] = useState("reviews");
  const { data: reviewData } = useMovieReviewQuery({ id });
  const { data: recommendationData } = useMovieRecommendationsQuery({ id });

  const reviewCount = reviewData ? reviewData.length : 0;
  const recommendationCount = recommendationData
    ? recommendationData.length
    : 0;

  useEffect(() => {}, [reviewCount, recommendationCount]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 review-recommend"
    >
      <Tab eventKey="reviews" title={`Reviews(${reviewCount})`}>
        <MovieReview id={id} />
      </Tab>
      <Tab eventKey="recommend" title={`Recommend(${recommendationCount})`}>
        <MovieRecommendation id={id} />
      </Tab>
    </Tabs>
  );
};

export default ReviewRecommendTab;
