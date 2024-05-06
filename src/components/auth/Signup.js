import React, { useRef, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./Signup.module.css";

const Signup = (props) => {
  const mailId = useSelector((state) => state.auth.mailId);
  const dispatch = useDispatch();

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
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4Fw8h_EULUmTEFSKu78R6XXnVSFnqtLc",
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
        const userMailIdToDirectory = mailId.replace("@", "").replace(".", "");
        const responseForInbox = await fetch(
          `https://peth-mail-app-default-rtdb.firebaseio.com/${userMailIdToDirectory}/inbox.json`,
          {
            method: "PUT",
            body: JSON.stringify({}), // Empty JSON object
            headers: { "Content-type": "application/json" },
          }
        );

        if (responseForInbox.ok) {
          console.log("Inbox created successfully");
        } else {
          console.error("Failed to create inbox:", responseForInbox.statusText);
        }

        // Create an empty sentMails for the recipient
        const responseForSentMails = await fetch(
          `https://peth-mail-app-default-rtdb.firebaseio.com/${userMailIdToDirectory}/sentMails.json`,
          {
            method: "PUT",
            body: JSON.stringify({}), // Empty JSON object
            headers: { "Content-Type": "application/json" },
          }
        );

        // Check if sentMails creation was successful
        if (responseForSentMails.ok) {
          console.log("SentMails created successfully");
        } else {
          console.error(
            "Failed to create sentMails:",
            responseForSentMails.statusText
          );
        }

        alert("Account created successfully");
      }
    }
    emailRef.current.value = "";
    pwdRef.current.value = "";
    confirmPwdRef.current.value = "";
  };

  return (
    <div className={classes["signup-main"]}>
      <header className={classes.header}>
        <h1 className={classes["header-title"]}>Create New Account/Signup</h1>
      </header>
      <section className={classes["form-section"]}>
        <Container className={classes["form-container"]}>
          <Form onSubmit={signUpFormSubmitHandler} className={classes.form}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  ref={pwdRef}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalConfirmPassword"
            >
              <Form.Label column sm={3}>
                Confirm Password
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  ref={confirmPwdRef}
                  required
                />
              </Col>
            </Form.Group>
            <button type="submit" className={classes["submit-button"]}>
              Submit
            </button>
          </Form>
        </Container>
      </section>
      <footer className={classes.footer}>
        <Container className={classes["footer-container"]}>
          <Link to="/login" className={classes["login-link"]}>
            Click here to Login, if you are already a user
          </Link>
        </Container>
      </footer>
    </div>
  );
};

export default Signup;
