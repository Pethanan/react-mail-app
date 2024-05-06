// SideNavBar.js

import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { mailsSliceActions } from "../store/mailsSlice";
import "./SideNavBar.css";

const SideNavBar = () => {
  const dispatch = useDispatch();
  const totalMails = useSelector((state) => state.mails.inboxTotalMails);
  const unReadMails = useSelector((state) => state.mails.inboxUnReadMails);

  function logoutHandler() {
    dispatch(authActions.logout());
    dispatch(mailsSliceActions.clearMailsOnLogout());
  }

  return (
    <div className="side-nav-container">
      <div className="logo-container">
        <p className="logo-text">Peth Mail</p>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/mailCompose"
            className="nav-link"
            activeClassName="active-link"
          >
            Compose
          </NavLink>
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
    </div>
  );
};

export default SideNavBar;
