import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import Circle from "../../Circle";
import SideNavBar from "../../layout/SideNavBar";
import { useDispatch } from "react-redux";
import { mailsSliceActions } from "../../store/mailsSlice";
import useHttpRequest from "../../hooks/useHttpRequest";
import InboxMailList from "../mails/inbox/InboxMailList";
import "./MailView.css";

const MailView = ({ mailCategory }) => {
  const { mail_key } = useParams();
  const dispatch = useDispatch();
  const mailCategoryData = useSelector((state) => state.mails[mailCategory]);
  const mailArr = mailCategoryData.filter((mail) => mail.key === mail_key);
  const mail = mailArr[0];
  const userDataEndPoint = useSelector((state) => state.auth.mailId)
    .replace("@", "")
    .replace(".", "");
  useEffect(() => {
    if (mailCategory === "inbox" && mail.viewed === false) {
      const updateMail = async () => {
        const response = await fetch(
          `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/inbox/${mail.key}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({ viewed: true }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        dispatch(mailsSliceActions.updateMailViewedStatus(mail.key));
      };
      updateMail();
    }
  }, []);

  return (
    <div className="main-container">
      <SideNavBar />
      <div className="mail-container">
        <div className="headers-table__container">
          <table>
            <tbody>
              <tr>
                <td className="label">From:</td>
                <td>{mail.sender}</td>
              </tr>
              <tr>
                <td className="label">To:</td>
                <td>{mail.receiver}</td>
              </tr>
              <tr>
                <td className="label">Subject:</td>
                <td>{mail.subject}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: mail.content }}
        ></div>
        <Link to={`/${mailCategory}`} className="link">
          Back to {mailCategory}
        </Link>
      </div>
    </div>
  );
};

export default MailView;
