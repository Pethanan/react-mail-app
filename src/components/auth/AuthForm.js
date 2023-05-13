import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";
import { useState } from "react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const switchToSignupHandler = () => {
    setIsLogin(false);
  };
  const switchToLoginHandler = () => {
    setIsLogin(true);
  };
  return (
    <>
      {isLogin && <LoginForm switchToSignupHandler={switchToSignupHandler} />}
      {!isLogin && <SignupForm switchToLoginHandler={switchToLoginHandler} />}
    </>
  );
};

export default AuthForm;
