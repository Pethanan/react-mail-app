import React, { useCallback, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { mailsSliceActions } from "../../../store/mailsSlice";
import useHttpRequest from "../../../hooks/useHttpRequest";
import SentMailItem from "./SentMailItem";
import "./SentMailList.css";

const SentMailList = () => {
  const dispatch = useDispatch();
  const sentMails = useSelector((state) => state.mails.sentMails);
  const userMailId = useSelector((state) => state.auth.mailId);
  const userDataEndPoint = userMailId
    ? userMailId.replace("@", "").replace(".", "")
    : "";

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
      url: `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/sentMails.json`,
    });
  }, [fetchSentMails]);

  const mailDeleteHandler = async (mail) => {
    const response = await fetch(
      `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/sentMails/${mail.key}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      dispatch(mailsSliceActions.deleteSentMail(mail.key));
    }
  };

  return (
    <Table striped bordered hover className="sent-mails-table">
      <thead>
        <tr>
          <th>To</th>
          <th>Subject</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sentMails.length === 0 ? (
          <tr>
            <td colSpan="3">No mails in inbox</td>
          </tr>
        ) : (
          sentMails
            .slice()
            .reverse()
            .map((mail) => (
              <SentMailItem
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

export default SentMailList;
