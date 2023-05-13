import React, { useContext, useRef, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const LoginForm = (props) => {
  const emailRef = useRef(null);
  const pwdRef = useRef(null);
  const dispatch = useDispatch();

  const loginAuthSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredMailId = emailRef.current.value;
    const enteredPwd = pwdRef.current.value;

    const authResponse = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0gvu4DcaKZpcr5ICbUE_wucAVfXNp96s",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredMailId,
          password: enteredPwd,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const authData = await authResponse.json();
    const token = !!authData.idToken;

    if (token) {
      console.log(authData.idToken);
      const payLoad = { mailId: enteredMailId, token: authData.idToken };
      dispatch(authActions.login(payLoad));
      alert("Login succesful!");
    } else {
      alert("Login was not succesful, pls try again with valid credentials");
    }
  };

  return (
    <Container
      style={{
        margin: "0 auto",
        marginTop: "130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form
          onSubmit={loginAuthSubmitHandler}
          style={{
            width: "30%",
            padding: "40px",
            backgroundColor: "#33FFAD",
            padding: "50px",
            borderRadius: "15px",
          }}
        >
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "60px",
            }}
          >
            <h4>Login Here</h4>
          </Container>

          <Form.Control
            style={{ marginTop: "30px" }}
            placeholder="email"
            type="mail"
            ref={emailRef}
          ></Form.Control>
          <Form.Control
            style={{ marginTop: "30px" }}
            placeholder="password"
            type="password"
            ref={pwdRef}
          ></Form.Control>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              style={{
                marginTop: "35px",
                backgroundColor: "#0B5D3C",
                border: "none",
              }}
            >
              Login
            </Button>
          </Container>
        </Form>
      </Container>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={props.switchToSignupHandler}
          style={{
            backgroundColor: "#0F8B59",
            margin: "50px 0",
            border: "none",
          }}
        >
          Click here to Sign up
        </Button>
      </Container>
    </Container>
  );
};

export default LoginForm;
