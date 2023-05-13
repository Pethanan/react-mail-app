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

const SentMailsPage = () => {
  const dispatch = useDispatch();
  const sentMails = useSelector((state) => state.mails.sentMails);
  console.log("from sentmails comp " + sentMails);
  const userMailId = useSelector((state) => state.auth.mailId);
  const userDataEndPoint = userMailId.replace("@", "").replace(".", "");

  const dispatchSentMails = useCallback(
    (fetchedSentMails) => {
      const sentMailsArray = [];

      Object.keys(fetchedSentMails).forEach((key) => {
        const mailItem = { ...fetchedSentMails[key], key: key };
        sentMailsArray.push(mailItem);
      });

      dispatch(mailsSliceActions.retrieveSentMailsFromBackEnd(sentMailsArray));
    },
    [mailsSliceActions]
  );

  const {
    isLoading,
    error,
    sendRequest: fetchSentMails,
  } = useHttpRequest(dispatchSentMails);

  useEffect(() => {
    fetchSentMails({
      url: `https://ecommerce---online-shopping-default-rtdb.firebaseio.com/mails/${userDataEndPoint}/sentMails.json`,
    });
  }, [fetchSentMails]);

  const mailDeleteHandler = async (e, mail) => {
    const response = await fetch(
      `https://ecommerce---online-shopping-default-rtdb.firebaseio.com/mails/${userDataEndPoint}/sentMails/${mail.key}.json`,
      {
        method: "DELETE",
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    dispatch(mailsSliceActions.deleteSentMail(mail.key));
  };

  const navLinksForSentMails = sentMails.map((mail) => (
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
        key={mail.subject}
        to={`/sentMails/${mail.key}`}
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
            justifyContent: "left",
            margin: "0 0",
            width: "700px",
          }}
        >
          <p style={{ paddingRight: "50px", width: "37%" }}>
            To: {mail.receiver}
          </p>
          <p style={{ paddingRight: "50px" }}>{mail.subject}</p>
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
          margin: "0",
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
              width: "100%",
              backgroundColor: "white",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 0 20px 15px",
                display: "flex",
                fontWeight: "bolder",
                margin: "0 0",
                width: "700px",
                width: "100%",
                backgroundColor: "#018C7A",
                verticalAlign: "center",
                margin: "0",
                color: "white",
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  paddingRight: "50px",
                  width: "25%",
                  margin: "0",
                }}
              >
                To
              </p>
              <p
                style={{
                  paddingRight: "50px",
                  width: "60%",
                  margin: "0",
                }}
              >
                Subject
              </p>
            </div>
            {navLinksForSentMails}
          </Nav>
        </Container>
      </Container>
    </div>
  );
};

export default SentMailsPage;
