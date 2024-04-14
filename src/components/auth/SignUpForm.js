import React, { useRef, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import Modal from "../UI/Modal";
import classes from "./SignUpForm.module.css";

const SignupForm = (props) => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isConfirmPwdValid, setIsConfirmPwdValid] = useState(false);

  const emailRef = useRef(null);
  const pwdRef = useRef(null);
  const confirmPwdRef = useRef(null);

  const signUpFormSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    console.log(enteredEmail);
    const enteredPwd = pwdRef.current.value;
    console.log(enteredPwd);

    const enteredConfirmPwd = confirmPwdRef.current.value;

    if (
      enteredEmail.length === 0 ||
      !enteredEmail.includes("@") ||
      enteredPwd.length < 6
    ) {
      if (!isEmailValid) {
        alert("Enter valid email");
      }
      if (!isPwdValid) {
        alert("Enter valid password");
      }
    } else {
      setIsEmailValid(true);
      setIsPwdValid(true);
      setIsConfirmPwdValid(true);
      console.log("passed here");
      const authResponse = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0gvu4DcaKZpcr5ICbUE_wucAVfXNp96s",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPwd,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const signupAuthResponse = await authResponse.json();
      console.log(signupAuthResponse);
      const idToken = !!signupAuthResponse.idToken;
      console.log(idToken);
      if (idToken) {
        alert("Account created successfully");
      }
    }
    emailRef.current.value = "";
    pwdRef.current.value = "";
    confirmPwdRef.current.value = "";
  };

  return (
    <>
      <Container
        style={{ marginTop: "60px", display: "flex", justifyContent: "center" }}
      >
        <h5
          style={{
            marginTop: "0 auto",
            textAlign: "center",
            marginBottom: "65px",
            fontWeight: "bolder",
          }}
        >
          Create New Account/ Signup
        </h5>
      </Container>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={signUpFormSubmitHandler} style={{ width: "50%" }}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="mail"
                placeholder="email"
                ref={emailRef}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="password"
                placeholder="password"
                ref={pwdRef}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={3}>
              Confirm Password
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="password"
                placeholder="re-enter password"
                required
                ref={confirmPwdRef}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Col
              sm={{ span: 10, offset: 0 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                style={{
                  marginTop: "35px",
                  backgroundColor: "#0B5D3C",
                  border: "none",
                }}
              >
                Submit
              </Button>
            </Col>
          </Form.Group>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={props.switchToLoginHandler}
              style={{
                backgroundColor: "#0F8B59",
                margin: "50px 0",
                border: "none",
              }}
            >
              Click here to Login, if you are already an user
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default SignupForm;
