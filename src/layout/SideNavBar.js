import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SideNavBar.css";
import { useState } from "react";
import MailComposer from "../components/mails/mailComposer/MailComposer";
import { Container } from "react-bootstrap";
import { logoutMiddleware } from "../store/middelware/logoutMiddleware";

const SideNavBar = () => {
  const [openMailComposer, setOpenMailComposer] = useState(false);

  const dispatch = useDispatch();
  const totalMails = useSelector((state) => state.mails.inboxTotalMails);
  const unReadMails = useSelector((state) => state.mails.inboxUnReadMails);

  function logoutHandler() {
    dispatch(logoutMiddleware());
  }

  function mailComposerOpenHandler() {
    setOpenMailComposer((prev) => {
      return !prev;
    });
  }
  return (
    <div className="side-nav-container">
      <div className="logo-container">
        <p className="logo-text">Peth Mail</p>
      </div>
      <ul className="nav-links">
        <li
          onClick={mailComposerOpenHandler}
          className="compose-btn__container"
        >
          <button>Compose</button>
        </li>
        <li>
          <NavLink
            to="/inbox"
            className="nav-link"
            activeClassName="active-link"
          >
            Inbox ({unReadMails} / {totalMails})
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sentMails"
            className="nav-link"
            activeClassName="active-link"
          >
            Sent mails
          </NavLink>
        </li>
      </ul>
      <button className="logout-button" onClick={logoutHandler}>
        Logout
      </button>
      {openMailComposer && (
        <Container className="mail-composer__container">
          <MailComposer mailComposerOpenHandler={mailComposerOpenHandler} />
        </Container>
      )}
    </div>
  );
};

export default SideNavBar;
