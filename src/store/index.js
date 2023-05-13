import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import mailsReducer from "./mailsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mails: mailsReducer,
  },
});

export default store;
