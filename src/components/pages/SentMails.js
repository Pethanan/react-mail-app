import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import Circle from "../../Circle";
import SideNavBar from "../../layout/SideNavBar";
import { useDispatch } from "react-redux";
import { mailsSliceActions } from "../../store/mailsSlice";
import useHttpRequest from "../../hooks/useHttpRequest";
import InboxMailList from "../mails/inbox/InboxMailList";
import "./SentMails.css";
import SentMailList from "../mails/sentMails/SentMailList";

const SentMailsPage = () => {
  return (
    <div className="sent-mail-box-container">
      <SideNavBar />
      <Container className="table-container">
        <header className="sent-mails-header">Sent Mails</header>
        <SentMailList />
      </Container>
    </div>
  );
};

export default SentMailsPage;
