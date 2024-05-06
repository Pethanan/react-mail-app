import React, { useCallback, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { mailsSliceActions } from "../../../store/mailsSlice";
import useHttpRequest from "../../../hooks/useHttpRequest";
import InboxMailItem from "./InboxMailItem";
import "./InboxMailList.css";

const InboxMailList = () => {
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
    [dispatch]
  );

  const { sendRequest: fetchInboxMails } = useHttpRequest(dispatchInboxMails);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      fetchInboxMails({
        url: `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/inbox.json`,
      });
    }, 1200);
    return () => clearInterval(timeInterval);
  }, [userDataEndPoint, fetchInboxMails]);

  const mailDeleteHandler = async (mail) => {
    const response = await fetch(
      `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/inbox/${mail.key}.json`,
      { method: "DELETE" }
    );
    const responseData = await response.json();
    console.log(responseData);
    dispatch(mailsSliceActions.deleteInboxMail(mail.key));
  };

  return (
    <Table striped bordered hover className="inbox-table">
      <thead>
        <tr>
          <th>From</th>
          <th>Subject</th>
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
