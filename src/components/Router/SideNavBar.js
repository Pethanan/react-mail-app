import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

const SideNavBar = () => {
  const totalMails = useSelector((state) => state.mails.inboxTotalMails);
  const unReadMails = useSelector((state) => state.mails.inboxUnReadMails);

  console.log(unReadMails);
  console.log(totalMails);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "25%",
        backgroundColor: "#ACE6E6",
        padding: "40px 20px",
        height: "100vh",
      }}
    >
      <Container
        style={{
          fontSize: "20px",
          fontWeight: "bolder",
          backgroundColor: "#68C4C4",
          borderRadius: "10px",
          color: "white",
          textDecoration: "none",
          margin: "10px 0 30px 0",
          border: "none",
          backgroundColor: "#1B5E55",
          padding: "0",
        }}
      >
        <p
          style={{
            verticalAlign: "center",
            margin: "0",
            padding: "15px 5px",
            paddingLeft: "40px",
            textDecoration: "none",
          }}
        >
          Peth Mail
        </p>
      </Container>
      <NavLink
        to="/mailCompose"
        style={{
          fontSize: "20px",
          fontWeight: "bolder",
          backgroundColor: "#68C4C4",
          borderRadius: "10px",
          color: "#343B3A",
          textDecoration: "none",
          marginBottom: "30px",
          border: "none",
        }}
        activeStyle={{
          fontSize: "20px",
          fontWeight: "bolder",
          backgroundColor: "black",
          borderRadius: "10px",
          color: "white",
          textDecoration: "none",
          marginBottom: "30px",
          border: "none",
        }}
      >
        <p
          style={{
            margin: "0",
            padding: "15px 10px",
            paddingLeft: "40px",
            textDecoration: "none",
          }}
        >
          Compose
        </p>
      </NavLink>
      <Nav>
        <NavLink
          to="/inbox"
          style={{
            margin: "0",
            padding: "15px 10px",
            paddingLeft: "40px",
            textDecoration: "none",
            color: "#343B3A",
            fontWeight: "bold",
          }}
          activeStyle={{
            margin: "0",
            padding: "15px 60px",
            textDecoration: "none",
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Inbox ({unReadMails} / {totalMails})
        </NavLink>
      </Nav>
      <Nav>
        <NavLink
          to="/sentMails"
          style={{
            margin: "0",
            padding: "15px 10px",
            paddingLeft: "40px",
            textDecoration: "none",
            fontWeight: "bold",
            color: "#343B3A",
          }}
          activeStyle={{
            margin: "0",
            padding: "15px 65px",
            textDecoration: "none",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "black",
          }}
        >
          Sent mails
        </NavLink>
      </Nav>
    </div>
  );
};

export default SideNavBar;
