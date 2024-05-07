import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import mailsReducer from "./mailsSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mails: mailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true,
      actionCreatorCheck: true,
    }).concat(thunk),
});

export default store;
