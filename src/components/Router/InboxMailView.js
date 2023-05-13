import React, { useEffect, useState } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import HTMLToDraft from "html-to-draftjs";
import { ContentState } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { Editor } from "draft-js";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mailsSliceActions } from "../../store/mailsSlice";
import SideNavBar from "./SideNavBar";

const InboxMailView = (props) => {
  const mail_key = useParams().mail_key;
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.mails.inbox);

  const userDataEndPoint = useSelector((state) => state.auth.mailId)
    .replace("@", "")
    .replace(".", "");

  const mailOnFocus = inbox.find((mail) => mail.key === mail_key);
  console.log(mailOnFocus.subject);

  useEffect(() => {
    const patchViewedProp = async () => {
      const response = await fetch(
        `https://ecommerce---online-shopping-default-rtdb.firebaseio.com/mails/${userDataEndPoint}/inbox/${mailOnFocus.key}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ viewed: true }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      dispatch(mailsSliceActions.replaceMailItem(mailOnFocus.key));
    };
    patchViewedProp();
  }, []);

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
            padding: "20px 0 20px 15px",
            fontWeight: "bolder",
            maxWidth: "100%",
            backgroundColor: "white",
            verticalAlign: "center",
            color: "black",
            overflow: "hidden",
            borderRadius: "10px",
            padding: "20px 40px",
          }}
        >
          <h4 style={{ paddingBottom: "10px" }}> Subject</h4>
          <p style={{ paddingBottom: "15px" }}>{mailOnFocus.subject}</p>
          <h4 style={{ paddingBottom: "10px" }}>Sender</h4>{" "}
          <p style={{ paddingBottom: "15px" }}>{mailOnFocus.sender}</p>
          <h4 style={{ paddingBottom: "10px" }}>Receiver</h4>{" "}
          <p style={{ paddingBottom: "15px" }}>{mailOnFocus.receiver}</p>
          <h4 style={{ paddingBottom: "10px" }}>Mail Body</h4>
          <p dangerouslySetInnerHTML={{ __html: mailOnFocus.content }} />
        </Container>
      </Container>
    </div>
  );
};

export default InboxMailView;
