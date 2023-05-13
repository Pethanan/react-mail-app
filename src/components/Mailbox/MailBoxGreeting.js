import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Container } from "react-bootstrap";
import EditorComponent from "../Router/MailComposer";

const MailComposer = () => {
  return (
    <Container style={{ margim: "20px" }}>
      <h2 style={{ margin: "30px 0" }}>Welcome to Mail Box</h2>
      <EditorComponent />;
    </Container>
  );
};

export default MailComposer;
