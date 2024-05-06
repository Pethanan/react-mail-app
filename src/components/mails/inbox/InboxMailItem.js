import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { mailsSliceActions } from "../../../store/mailsSlice";
import "./InboxMailItem.css";
import { useDispatch, useSelector } from "react-redux";

const InboxMailItem = ({ mail }) => {
  const dispatch = useDispatch();
  const userDataEndPoint = useSelector((state) => state.auth.mailId)
    .replace(".", "")
    .replace("@", "");
  const mailDeleteHandler = async (key) => {
    const response = await fetch(
      `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/inbox/${key}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      dispatch(mailsSliceActions.deleteInboxMail(key));
    }
  };
  return (
    <tr className={`inbox-mail-item ${!mail.viewed && "unviewed"}`}>
      <td>{mail.sender}</td>
      <td>
        <Link to={`/inbox/${mail.key}`} className="link-to-mail">
          {mail.subject} <em>{!mail.viewed && "(Unread)"}</em>
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
