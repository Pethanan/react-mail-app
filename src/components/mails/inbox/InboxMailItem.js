import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { mailsSliceActions } from "../../../store/mailsSlice";
import "./InboxMailItem.css";
import { useDispatch } from "react-redux";

const InboxMailItem = ({ mail }) => {
  const dispatch = useDispatch();

  return (
    <tr className={`inbox-mail-item ${!mail.viewed && "unviewed"}`}>
      <td>{mail.sender}</td>
      <td>
        {mail.subject} <em>(Unread)</em>
      </td>
      <td>
        <Button
          variant="danger"
          size="sm"
          className="inbox-mail-delete-btn"
          onClick={() => dispatch(mailsSliceActions.deleteInboxMail(mail.key))}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default InboxMailItem;
