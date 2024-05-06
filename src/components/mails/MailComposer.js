import React, { Component, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailsSliceActions } from "../../store/mailsSlice";
import { convertToRaw } from "draft-js";

const MailComposer = () => {
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
    console.log(content);
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

      console.log(recvrMailIdToDirectory);
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

      console.log(await responseFromReceiverDB.json());

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
      console.log(response);

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
    <Form onSubmit={sendMail} style={{ margin: "50px" }}>
      <h4 style={{ margin: "35px 0" }}>Compose Mail</h4>
      {!loading && (
        <p style={{ backgroundColor: "green", color: "white" }}>
          Success : Mail has been sent !
        </p>
      )}
      <Form.Label>To</Form.Label>
      <Form.Control
        type="mail"
        name="receiver"
        value={mail.receiver}
        onChange={changeHandler}
      ></Form.Control>
      <Form.Label>Subject</Form.Label>
      <Form.Control
        type="text"
        name="subject"
        value={mail.subject}
        onChange={changeHandler}
      ></Form.Control>

      <Editor
        editorState={mainContentState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={mailContentStateChangeHandler}
      />
      <Button type="submit">Send</Button>
    </Form>
  );
};

export default MailComposer;
