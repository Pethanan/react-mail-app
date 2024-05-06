import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthForm from "../auth/AuthForm";
import { useSelector } from "react-redux";

import MailComposerPage from "../mails/MailComposer";
import InboxPage from "./Inbox";
import SentMailsPage from "./SentMails";
import InboxMailView from "../mailView/InboxMailView";
import SentMailView from "../mailView/SentMailView";

const RouterSetUp = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  return (
    <Switch>
      <Route path="/" exact>
        <AuthForm></AuthForm>
        {isLoggedin && <Redirect to="/inbox"></Redirect>}
      </Route>
      <Route path="/mailCompose" exact>
        <MailComposerPage />
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
