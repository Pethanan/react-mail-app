import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { mailsSliceActions } from "../../../store/mailsSlice";
import InboxMailItem from "./InboxMailItem";
import "./InboxMailList.css";
import { fetchInboxMailsMiddleware } from "../../../store/middelware/inboxMiddleware";

const InboxMailList = () => {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.mails.inbox);
  const userMailId = useSelector((state) => state.auth.mailId);
  const userDataEndPoint = userMailId.replace("@", "").replace(".", "");

  useEffect(() => {
    dispatch(fetchInboxMailsMiddleware(userDataEndPoint));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchInboxMailsMiddleware(userDataEndPoint));
    }, 20000);
    return () => clearInterval(intervalId);
  }, [dispatch, userDataEndPoint]);

  const mailDeleteHandler = async (mail) => {
    const response = await fetch(
      `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/inbox/${mail.key}.json`,
      { method: "DELETE" }
    );
    const responseData = await response.json();
    dispatch(mailsSliceActions.deleteInboxMail(mail.key));
  };

  return (
    <Table striped bordered hover className="inbox-table">
      <thead>
        <tr>
          <th>From</th>
          <th>
            Subject <em>(click on Subject to View the mail)</em>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {inbox.length === 0 ? (
          <tr>
            <td colSpan="3">No mails in inbox</td>
          </tr>
        ) : (
          inbox
            .slice()
            .reverse()
            .map((mail) => (
              <InboxMailItem
                key={mail.key}
                mail={mail}
                onDelete={() => mailDeleteHandler(mail)}
              />
            ))
        )}
      </tbody>
    </Table>
  );
};

export default InboxMailList;
