import React, { useState } from "react";
import logo from "./Netflix_Logo_PMS.png";
import "./AppLayout.style.css";
import { Navbar, Button, Nav, Container, Form, Image } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div>
      <Navbar expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image src={logo} alt="netflix logo" width={100} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/" className="text-white">
                Home
              </Nav.Link>
              <Nav.Link href="/movies" className="text-white">
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex search-form" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>{" "}
      <Outlet />
    </div>
  );
};

export default AppLayout;
