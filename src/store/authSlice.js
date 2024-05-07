import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  mailId: sessionStorage.getItem("authObject")
    ? JSON.parse(sessionStorage.getItem("authObject")).mailId
    : "",
  isLoggedin: sessionStorage.getItem("authObject")
    ? !!JSON.parse(sessionStorage.getItem("authObject")).token
    : false,
  token: sessionStorage.getItem("authObject")
    ? JSON.parse(sessionStorage.getItem("authObject")).token
    : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      console.log(action.payload.mailId);

      state.mailId = action.payload.mailId;
      state.isLoggedin = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedin = false;
      state.token = null;
      state.mailId = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
