import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { mailsSliceActions } from "../../../store/mailsSlice";
import "./SentMailItem.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useHttpRequest from "../../../hooks/useHttpRequest";

const SentMailItem = ({ mail }) => {
  const dispatch = useDispatch();
  const userDataEndPoint = useSelector((state) => state.auth.mailId)
    .replace(".", "")
    .replace("@", "");

  const { sendRequest, loading, error } = useHttpRequest();

  const mailDeleteHandler = async (key) => {
    try {
      await sendRequest(
        `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/sentMails/${key}.json`,
        "DELETE"
      );

      dispatch(mailsSliceActions.deleteSentMail(key));
    } catch (error) {
      console.error("An error occurred while deleting mail:", error);
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
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <Button
              variant="danger"
              size="sm"
              className="inbox-mail-delete-btn"
              onClick={() => mailDeleteHandler(mail.key)}
            >
              Delete
            </Button>
            {error && <p className="error-message">{error}</p>}
          </>
        )}
      </td>
    </tr>
  );
};

export default SentMailItem;
