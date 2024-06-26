import React, { useRef } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import classes from "./Login.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = (props) => {
  const emailRef = useRef(null);
  const pwdRef = useRef(null);
  const dispatch = useDispatch();

  const loginAuthSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredMailId = emailRef.current.value;
    const enteredPwd = pwdRef.current.value;

    const authResponse = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4Fw8h_EULUmTEFSKu78R6XXnVSFnqtLc",
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
      const authObject = { mailId: enteredMailId, token: authData.idToken };
      sessionStorage.setItem("authObject", JSON.stringify(authObject));
      alert("Login successful!");
    } else {
      alert(
        "Login was not successful, please try again with valid credentials"
      );
    }
  };

  return (
    <>
      <h1 className={classes["header"]}>Welcome to Peth Mails!</h1>
      <Container className={classes["login-container"]}>
        <Form
          onSubmit={loginAuthSubmitHandler}
          className={classes["login-form"]}
        >
          <h4>Login Here</h4>
          <Form.Control
            className={classes["login-input"]}
            placeholder="Email"
            type="email"
            ref={emailRef}
          />
          <Form.Control
            className={classes["login-input"]}
            placeholder="Password"
            type="password"
            ref={pwdRef}
          />
          <button type="submit" className={classes["login-button"]}>
            Login
          </button>
        </Form>
        <Link className={classes.link} to="/">
          Click here to Sign up
        </Link>
      </Container>
    </>
  );
};

export default Login;
