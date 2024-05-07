import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

import InboxPage from "./Inbox";
import SentMailsPage from "./SentMails";

import Login from "../auth/Login";
import Signup from "../auth/Signup";
import MailView from "../mailView/MailView";

const RouterSetUp = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {!isLoggedin && <Signup />}
          {isLoggedin && <Redirect to="/inbox"></Redirect>}
        </Route>
        <Route path="/login">
          {!isLoggedin && <Login />}
          {isLoggedin && <Redirect to="/inbox"></Redirect>}
        </Route>

        <Route path="/inbox" exact>
          {!isLoggedin && <Redirect to="/login" />}
          {isLoggedin && <InboxPage />}
        </Route>
        <Route path="/sentMails" exact>
          {!isLoggedin && <Redirect to="/login" />}
          {isLoggedin && <SentMailsPage />}
        </Route>
        <Route path="/inbox/:mail_key">
          {!isLoggedin && <Redirect to="/login" />}
          {isLoggedin && <MailView mailCategory={"inbox"} />}
        </Route>
        <Route path="/sentMails/:mail_key">
          {!isLoggedin && <Redirect to="/login" />}
          {isLoggedin && <MailView mailCategory={"sentMails"} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterSetUp;
