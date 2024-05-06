import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { Container, Button } from "react-bootstrap";

export const BackDrop = (props) => {
  return <div className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return (
    <Container className={classes.modal}>
      <h4>Succss</h4>
      <p>You completed sing up successfully!</p>
      <Button onClick={props.modalCloseHandler}>Close</Button>
    </Container>
  );
};

const modalElement = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay modalCloseHandler={props.modalCloseHandler}>
          {props.children}
        </ModalOverlay>,
        modalElement
      )}
      {ReactDOM.createPortal(
        <BackDrop modalCloseHandler={props.modalCloseHandler}></BackDrop>,
        modalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
