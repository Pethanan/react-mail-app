import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SideNavBar from "../../layout/SideNavBar";
import { useDispatch } from "react-redux";
import { mailsSliceActions } from "../../store/mailsSlice";
import useHttpRequest from "../../hooks/useHttpRequest";
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

  const { sendRequest } = useHttpRequest();

  useEffect(() => {
    if (mailCategory === "inbox" && mail.viewed === false) {
      const updateMail = async () => {
        try {
          await sendRequest(
            `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/inbox/${mail.key}.json`,
            "PATCH",
            { viewed: true },
            {
              "Content-Type": "application/json",
            }
          );
          dispatch(mailsSliceActions.updateMailViewedStatus(mail.key));
        } catch (error) {
          console.error("An error occurred while updating mail:", error);
        }
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
        <Link to={`/${mailCategory}`} className="link-to-main">
          Back to {mailCategory.toUpperCase()}
        </Link>
      </div>
    </div>
  );
};

export default MailView;
