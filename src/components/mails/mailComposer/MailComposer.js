import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailsSliceActions } from "../../../store/mailsSlice";
import "./MailComposer.css";

const MailComposer = ({ mailComposerOpenHandler }) => {
  const [loading, setLoading] = useState(true);
  const editorState = EditorState.createEmpty();
  const [mainContentState, setMainContentState] = useState(editorState);
  const [content, setContent] = useState("");

  const mailId = useSelector((state) => state.auth.mailId);
  const dispatch = useDispatch();

  const [mail, setMail] = useState({
    subject: "",
    receiver: "",
    sender: mailId,
    content: "",
  });

  const mailContentStateChangeHandler = (editorState) => {
    setMainContentState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const changeHandler = (e) => {
    setMail({
      ...mail,
      [e.target.name]: e.target.value,
      content,
    });
  };

  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const mailObj = {
        ...mail,
        content: content,
        viewed: false,
      };

      const mailObjStringified = JSON.stringify(mailObj);
      const recvrMailIdToDirectory = mail.receiver.replace(/[@.]/g, "");

      const responseFromReceiverDB = await fetch(
        `https://peth-mail-app-default-rtdb.firebaseio.com/${recvrMailIdToDirectory}/inbox.json`,
        {
          method: "POST",
          body: mailObjStringified,
          headers: { "Content-type": "application/json" },
        }
      );

      if (!responseFromReceiverDB.ok) {
        throw new Error("Failed to send mail to receiver.");
      }

      const SenderMailIdToDirectory = mailId.replace("@", "").replace(".", "");

      const responseFromSenderDB = await fetch(
        `https://peth-mail-app-default-rtdb.firebaseio.com/${SenderMailIdToDirectory}/sentMails.json`,
        {
          method: "POST",
          body: mailObjStringified,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!responseFromSenderDB.ok) {
        throw new Error("Failed to save mail in sent folder.");
      }

      const response = await responseFromSenderDB.json();

      const mailwithNameKey = { ...mailObj, key: response.name };
      dispatch(mailsSliceActions.addSentItem(mailwithNameKey));

      setMail({ receiver: "", subject: "" });
      const clearEditorState = EditorState.createEmpty();
      setMainContentState(clearEditorState);
      setLoading(false);
      setTimeout(() => {
        setLoading(true);
      }, 2500);
    } catch (error) {
      console.error("Error sending mail:", error.message);
    }
  };

  return (
    <Form onSubmit={sendMail} className="mail-composer-form">
      <Container className="compose-header__container">
        <h5 className="compose-header">Compose Mail</h5>
        <Button onClick={mailComposerOpenHandler}>Close X</Button>
      </Container>

      {!loading && (
        <p className="success-message">Success: Mail has been sent!</p>
      )}
      <Form.Group controlId="formReceiver">
        <Form.Label>To</Form.Label>
        <Form.Control
          type="mail"
          name="receiver"
          value={mail.receiver}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group controlId="formSubject" className="mail-subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          name="subject"
          value={mail.subject}
          onChange={changeHandler}
        />
      </Form.Group>

      <Editor
        editorState={mainContentState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={mailContentStateChangeHandler}
        editorStyle={{
          border: "1px solid #000",
          minHeight: "200px",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#ffffff",
        }}
      />
      <Button type="submit" className="sendmail-button">
        Send
      </Button>
    </Form>
  );
};

export default MailComposer;
