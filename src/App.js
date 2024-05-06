import { useEffect, useState } from "react";
import "./App.css";
import RouterSetUp from "./components/pages/RouterSetUp";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterSetUp />
      </Provider>
    </>
  );
}

export default App;
