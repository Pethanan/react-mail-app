import React from "react";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { mailsSliceActions } from "../../../store/mailsSlice";
import "./InboxMailItem.css";
import { useDispatch, useSelector } from "react-redux";
import useHttpRequest from "../../../hooks/useHttpRequest";

const InboxMailItem = ({ mail }) => {
  const dispatch = useDispatch();
  const userDataEndPoint = useSelector((state) => state.auth.mailId)
    .replace(".", "")
    .replace("@", "");

  const { sendRequest, loading, error } = useHttpRequest();

  const mailDeleteHandler = async (key) => {
    try {
      await sendRequest(
        `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/inbox/${key}.json`,
        "DELETE"
      );

      dispatch(mailsSliceActions.deleteInboxMail(key));
    } catch (error) {
      console.error("An error occurred while deleting mail:", error);
    }
  };
  return (
    <tr className={`inbox-mail-item ${!mail.viewed && "unviewed"}`}>
      <td>{mail.sender}</td>
      <td>
        <Link to={`/inbox/${mail.key}`} className="link-to-mail">
          {mail.subject} <em>{!mail.viewed && "(Unread)"}</em>
          <em>(click on Subject to View the mail)</em>
        </Link>
      </td>
      <td>
        <Button
          variant="danger"
          size="sm"
          className="inbox-mail-delete-btn"
          onClick={() => mailDeleteHandler(mail.key)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default InboxMailItem;
