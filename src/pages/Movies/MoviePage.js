import React, { useState } from "react";
import "./MoviePage.style.css";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import Pagination from "./components/Pagination";

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sortBy,
    filterBy,
  });

  console.log(data);

  const { data: genreData } = useMovieGenreQuery();

  const handleSortBy = (event) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
    setPage(1);
  };

  const handleFilterBy = (event) => {
    const selectedFilterBy = event.target.value;
    setFilterBy(selectedFilterBy);
    setPage(1);
  };

  const SortedMovieCards = () => {
    if (!data || !data.results) return null;

    let sortedMovies = [...data.results];

    if (sortBy === "a-z") {
      sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "z-a") {
      sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "release_date.desc") {
      sortedMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    } else if (sortBy === "release_date.asc") {
      sortedMovies.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    } else if (sortBy === "popularity") {
      sortedMovies.sort((a, b) => b.popularity - a.popularity);
    }

    if (filterBy && genreData) {
      sortedMovies = sortedMovies.filter((movie) =>
        movie.genre_ids.includes(parseInt(filterBy))
      );
    }

    if (sortedMovies.length === 0) {
      return <h1 className="mt-5">No movies found.</h1>;
    }

    return sortedMovies.map((movie, index) => (
      <Col key={index} lg={3} md={6} xs={12} className="mt-3">
        <MovieCard movie={movie} />
      </Col>
    ));
  };

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
      <Row className="mb-4">
        <Col>
          <Form.Select onChange={handleSortBy} value={sortBy}>
            <option>Sort By</option>
            <option value="popularity">Popularity</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="release_date.desc">Latest</option>
            <option value="release_date.asc">Oldest</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select onChange={handleFilterBy} value={filterBy}>
            <option value="">Genre</option>
            {genreData &&
              genreData.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <SortedMovieCards />
      </Row>
      {SortedMovieCards.length > 0 && <Pagination />}
    </Container>
  );
};

export default MoviePage;
