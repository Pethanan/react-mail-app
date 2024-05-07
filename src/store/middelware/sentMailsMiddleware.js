import { mailsSliceActions } from "../mailsSlice";

export const fetchSentMailsMiddleware = (userDataEndPoint) => {
  return async (dispatch) => {
    if (!!userDataEndPoint) {
      try {
        const response = await fetch(
          `https://peth-mail-app-default-rtdb.firebaseio.com/${userDataEndPoint}/sentMails.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sent mails.");
        }
        const data = await response.json();

        const sentMailsArray = Object.keys(data).map((key) => ({
          ...data[key],
          key: key,
        }));

        dispatch(
          mailsSliceActions.retrieveSentMailsFromBackEnd(sentMailsArray)
        );
      } catch (error) {
        console.error("Error fetching sent mails:", error.message);
      }
    }
  };
};
