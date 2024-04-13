import React, { useState } from "react";
import "../MoviePage.style.css";
import ReactPaginate from "react-paginate";
import { Col, Row } from "react-bootstrap";
import { useSearchMovieQuery } from "../../../hooks/useSearchMovie";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const { data } = useSearchMovieQuery({
    page,
  });

  return (
    <Row className="mt-3">
      <Col xs={12} lg={12}>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={data?.total_pages}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={page - 1}
        />
      </Col>
    </Row>
  );
};

export default Pagination;
