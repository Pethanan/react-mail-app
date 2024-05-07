import { mailsSliceActions } from "../mailsSlice";
import { authActions } from "../authSlice";

export const logoutMiddleware = () => {
  return async (dispatch) => {
    await dispatch(mailsSliceActions.clearMailsOnLogout());
    dispatch(authActions.logout());
    sessionStorage.removeItem("authObject");
  };
};
