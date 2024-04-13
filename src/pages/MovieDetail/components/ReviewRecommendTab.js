import React, { useState } from "react";
import "./ReviewRecommendTab.style.css";
import { Tabs, Tab } from "react-bootstrap";
import MovieReview from "./MovieReview";

const ReviewRecommendTab = ({ id }) => {
  const [key, setKey] = useState("reviews");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 review-recommend"
    >
      <Tab eventKey="reviews" title="Reviews">
        <MovieReview id={id} />
      </Tab>
      <Tab eventKey="recommend" title="Recommend">
        Tab content for Profile
      </Tab>
    </Tabs>
  );
};

export default ReviewRecommendTab;
