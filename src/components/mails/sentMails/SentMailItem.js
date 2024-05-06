import React from "react";
import { Button } from "react-bootstrap";
import { mailsSliceActions } from "../../../store/mailsSlice";
import "./SentMailItem.css";
import { useDispatch } from "react-redux";

const SentMailItem = ({ mail }) => {
  const dispatch = useDispatch();

  return (
    <tr className="sent-mail-item">
      <td>{mail.receiver}</td>
      <td>{mail.subject}</td>
      <td>
        <Button
          variant="danger"
          size="sm"
          className="inbox-mail-delete-btn"
          onClick={() => dispatch(mailsSliceActions.deleteSentMail(mail.key))}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default SentMailItem;
