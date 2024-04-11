import React from "react";
import "./NotFoundPage.style.css";
import AppLayout from "../Layout/AppLayout";

const NotFoundPage = () => {
  return (
    <div>
      <AppLayout />
      <img
        src="https://i.imgflip.com/5ndhra.jpg"
        alt="page not found"
        className="not-found-img"
      />
      <h1 className="not-found-h1 mt-3">404</h1>
      <p className="not-found-p">Sorry, the page not found :( </p>
    </div>
  );
};

export default NotFoundPage;
