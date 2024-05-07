import { useEffect, useState } from "react";
import "./App.css";
import RouterSetUp from "./components/pages/RouterSetUp";
import { useDispatch, useSelector } from "react-redux";
import { fetchSentMailsMiddleware } from "./store/middelware/sentMailsMiddleware";
import { fetchInboxMailsMiddleware } from "./store/middelware/inboxMiddleware";

function App() {
  const dispatch = useDispatch();
  const userMailId = useSelector((state) => state.auth.mailId);
  const userDataEndPoint = userMailId
    ? userMailId.replace("@", "").replace(".", "")
    : "";

  useEffect(() => {
    dispatch(fetchSentMailsMiddleware(userDataEndPoint));
    dispatch(fetchInboxMailsMiddleware(userDataEndPoint));
  }, [dispatch, userDataEndPoint]);

  return (
    <>
      <RouterSetUp />
    </>
  );
}

export default App;
