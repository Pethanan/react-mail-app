import React from "react";
import { Button } from "react-bootstrap";
import { mailsSliceActions } from "../../../store/mailsSlice";
import "./SentMailItem.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SentMailItem = ({ mail }) => {
  const dispatch = useDispatch();
  const userDataEndPoint = useSelector((state) => state.auth.mailId)
    .replace(".", "")
    .replace("@", "");
  const mailDeleteHandler = async (key) => {
    const response = await fetch(
      `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/sentMails/${key}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      dispatch(mailsSliceActions.deleteSentMail(key));
    }
  };

  return (
    <tr className="sent-mail-item">
      <td>{mail.receiver}</td>
      <td>
        <Link to={`/sentMails/${mail.key}`} className="link-to-mail">
          {mail.subject}
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

export default SentMailItem;
