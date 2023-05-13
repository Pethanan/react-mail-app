import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthForm from "../auth/AuthForm";
import { useSelector } from "react-redux";

import MailComposer from "./MailComposer";
import InboxPage from "./Inbox";
import MailView from "./SentMailView";
import SentMailsPage from "./SentMails";
import InboxMailView from "./InboxMailView";
import SentMailView from "./SentMailView";

const RouterSetUp = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  return (
    <Switch>
      <Route path="/mailCompose" exact>
        <MailComposer />
      </Route>

      <Route path="/" exact>
        <AuthForm></AuthForm>
        {isLoggedin && <Redirect to="/inbox"></Redirect>}
      </Route>
      <Route path="/inbox" exact>
        {isLoggedin && <InboxPage />}
        {!isLoggedin && <Redirect to="/" />}
      </Route>
      <Route path="/sentMails" exact>
        <SentMailsPage />
        {!isLoggedin && <Redirect to="/" />}
      </Route>
      <Route path="/inbox/:mail_key">
        <InboxMailView />
        {!isLoggedin && <Redirect to="/" />}
      </Route>
      <Route path="/sentMails/:mail_key">
        <SentMailView />
        {!isLoggedin && <Redirect to="/" />}
      </Route>
    </Switch>
  );
};

export default RouterSetUp;
