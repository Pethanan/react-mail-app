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
import SideNavBar from "./SideNavBar";
import { useDispatch } from "react-redux";
import { mailsSliceActions } from "../../store/mailsSlice";
import useHttpRequest from "../../hooks/use-http";

const InboxPage = () => {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.mails.inbox);

  const userMailId = useSelector((state) => state.auth.mailId);
  const userDataEndPoint = userMailId.replace("@", "").replace(".", "");

  const dispatchInboxMails = useCallback(
    (fetchedInboxMails) => {
      const inboxMailsArray = [];
      Object.keys(fetchedInboxMails).forEach((key) => {
        const inboxItem = { ...fetchedInboxMails[key], key: key };
        inboxMailsArray.push(inboxItem);
      });
      dispatch(mailsSliceActions.retrieveInboxFromBackEnd(inboxMailsArray));
    },
    [mailsSliceActions]
  );

  const {
    sendRequest: fetchInboxMails,
    isLoading,
    error,
  } = useHttpRequest(dispatchInboxMails);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      fetchInboxMails({
        url: `https://ecommerce---online-shopping-default-rtdb.firebaseio.com/mails/${userDataEndPoint}/inbox.json`,
      });
    }, 4000);
  }, [userDataEndPoint]);

  const mailDeleteHandler = async (e, mail) => {
    const response = await fetch(
      `https://ecommerce---online-shopping-default-rtdb.firebaseio.com/mails/${userDataEndPoint}/inbox/${mail.key}.json`,
      {
        method: "DELETE",
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    dispatch(mailsSliceActions.deleteInboxMail(mail.key));
  };

  const linksForInboxMails = inbox.map((mail) => (
    <div
      key={mail.key}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        backgroundColor: "white",
        borderBottom: "1px solid #C3D9D6",
        width: "100%",
      }}
    >
      <Link
        key={mail.key}
        to={`/inbox/${mail.key}`}
        mail={mail}
        style={{
          padding: "15px 0",
          textDecoration: "none",
          color: "black",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "center",
            margin: "0 0",
            width: "700px",
            verticalAlign: "center",
          }}
        >
          {!mail.viewed && <Circle></Circle>}
          <p style={{ paddingRight: "50px", margin: "0 0" }}>{mail.sender}</p>
          <p style={{ paddingRight: "50px", margin: "0 0" }}>{mail.subject}</p>
        </Container>
      </Link>
      <Container style={{ display: "flex", alignItems: "center" }}>
        <Button
          style={{
            backgroundColor: "#C3D9D6",
            border: "none",
            color: "#000D0B",
          }}
          onClick={(e) => {
            mailDeleteHandler(e, mail);
          }}
        >
          Delete
        </Button>
      </Container>
    </div>
  ));

  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        height: "100vh",
        backgroundColor: "#ace6e6",
        overflow: "hidden",
      }}
    >
      <Container
        style={{
          width: "100%",

          overflow: "hidden",

          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          height: "200px",
          margin: "0 0",
          height: "100vh",
        }}
      >
        <SideNavBar />
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "48px 0",
            overflow: "hidden",
          }}
        >
          <Nav
            style={{
              display: "flex",
              flexDirection: "column",
              border: " 1px solid #525E5C",
              height: "100vh",
              maxWidth: "100%",
              backgroundColor: "white",
              borderRadius: "10px",
              overflow: "hidden",
              margin: "0 0",
            }}
          >
            <div
              style={{
                padding: "20px 0 20px 15px",
                display: "flex",
                fontWeight: "bolder",
                maxWidth: "100%",
                backgroundColor: "#018C7A",
                verticalAlign: "center",
                margin: "0 0",
                color: "white",
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  paddingRight: "50px",
                  width: "25%",
                  margin: "0 0",
                }}
              >
                Sender
              </p>
              <p
                style={{
                  paddingRight: "50px",
                  width: "60%",
                  margin: "0 0",
                }}
              >
                Subject
              </p>
            </div>
            {linksForInboxMails}
          </Nav>
        </Container>
      </Container>
    </div>
  );
};

export default InboxPage;
