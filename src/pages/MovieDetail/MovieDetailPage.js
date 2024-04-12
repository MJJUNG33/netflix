import React from "react";
import "./MovieDetailPage.style.css";
import { Badge, Col, Container, Row } from "react-bootstrap";
import starIcon from "../../images/star.png";
import voteIcon from "../../images/vote.png";
import budgetIcon from "../../images/money-bag.png";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import CurrencyFormat from "react-currency-format";
import MovieReview from "./components/MovieReview";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    id,
  });
  const { data: genreData } = useMovieGenreQuery();

  console.log("MovieDetailPage Data:", data);

  const showGenre = (genreIdList) => {
    if (!genreData) return [];

    const genreNameList = genreIdList.map((genre) => {
      const genreObj = genreData.find((dataGenre) => dataGenre.id === genre.id);
      return genreObj?.name;
    });

    return genreNameList;
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
    <Container>
      {data && (
        <>
          <Row>
            <Col xs={12} lg={5} className="mt-3 mb-3">
              <div
                style={{
                  backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path})`,
                }}
                className="movie-card detail-movie-poster"
              >
                {" "}
              </div>
            </Col>
            <Col lg={7} className=" movie-detail-info">
              <h4 className="text-start">{data?.title}</h4>
              <div className="text-start genres">
                {showGenre(data?.genres).map((genre, index) => (
                  <Badge key={index} bg="danger" className="me-1">
                    {genre}
                  </Badge>
                ))}
              </div>

              <Row className="rating detail-page-rating">
                <Col xs={3} className="detail-icons">
                  <span>
                    <img src={starIcon} alt="rating" className=" icons" />
                  </span>
                  {data?.vote_average}
                </Col>
                <Col xs={3} className="detail-icons">
                  <span>
                    <img src={voteIcon} alt="voting" className=" icons" />
                  </span>
                  {data?.vote_count}
                </Col>
                <Col xs={4} className="detail-icons">
                  <span>
                    <img src={budgetIcon} alt="budget" className=" icons " />
                  </span>
                  <CurrencyFormat
                    value={data?.budget}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </Col>
              </Row>

              <Row className="runtime-release">
                <Col xs={5} md={12}>
                  {" "}
                  <div className="runtime detail-runtime">
                    <span className="fw-bold">Runtime: </span>
                    {data?.runtime} mins
                  </div>
                </Col>
                <Col xs={6} md={12}>
                  <div className="release-date detail-release mt-0">
                    <span className="fw-bold">Release: </span>{" "}
                    {data?.release_date}{" "}
                  </div>
                </Col>
              </Row>
              <div className="production">
                <span className="fw-bold">Production: </span>{" "}
                {data?.production_companies[0].name}
              </div>

              <div className="overview mt-2 pe-3">
                <span className="fw-bold">Overview: </span>
                {data?.overview}
              </div>
              <div>{data.adult ? <Badge bg="danger">18</Badge> : ""}</div>
            </Col>
          </Row>
          <MovieReview id={id} />
        </>
      )}
    </Container>
  );
};

export default MovieDetailPage;
