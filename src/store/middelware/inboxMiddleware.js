import { mailsSliceActions } from "../mailsSlice";

export const fetchInboxMailsMiddleware =
  (userDataEndPoint) => async (dispatch) => {
    if (!!userDataEndPoint) {
      try {
        const response = await fetch(
          `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/inbox.json`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch inbox mails");
        }
        const inboxMailsArray = Object.keys(data).map((key) => ({
          ...data[key],
          key: key,
        }));
        dispatch(mailsSliceActions.retrieveInboxFromBackEnd(inboxMailsArray));
      } catch (error) {
        console.error("Error fetching inbox mails:", error.message);
      }
    }
  };
