import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import trailerIcon from "../../../images/video-player.png";
import "./MovieTrailer.style.css";
import { useMovieTrailerQuery } from "../../../hooks/useMovieTrailer";
import YouTube from "react-youtube";

function MovieTrailer({ id }) {
  const [show, setShow] = useState(false);
  const { data: trailerData } = useMovieTrailerQuery({ id });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="trailer-button" variant="danger" onClick={handleShow}>
        <img src={trailerIcon} className="trailer-icon" alt="movie trailer" />{" "}
        Watch Trailer
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Movie Trailer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trailerData ? (
            <YouTube
              videoId={trailerData[0].key}
              opts={{ width: "100%", height: "400px" }}
            />
          ) : (
            <p>No trailer available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MovieTrailer;
