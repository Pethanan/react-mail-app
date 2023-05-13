export const fetchFromDB = (mailId) => {
  return async (dispatch) => {
    const sendData = async () => {
      const dataStorePoint = mailId.replace("@", "").replace(".", "");

      const response = await fetch(
        `https://ecommerce---online-shopping-default-rtdb.firebaseio.com/mails/${dataStorePoint}/mails.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            inbox: mails.inbox,
            sentMails: mails.sentMails,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
      if (!response.ok) {
        throw new Error("Could not Fetch");
      }
      const data = await response.json();
      console.log(data);
      return data;
    };
    const fetchedMails = await sendData();
  };
};
