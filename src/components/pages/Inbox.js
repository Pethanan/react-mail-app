import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SideNavBar from "../../layout/SideNavBar";
import InboxMailList from "../mails/inbox/InboxMailList";

import "./Inbox.css";

const InboxPage = () => {
  return (
    <div className="mail-box-container">
      <SideNavBar />
      <Container className="table-container">
        <header className="inbox-header">Inbox</header>
        <InboxMailList />
      </Container>
    </div>
  );
};

export default InboxPage;
