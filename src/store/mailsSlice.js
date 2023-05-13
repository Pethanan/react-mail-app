import { createSlice } from "@reduxjs/toolkit";
import HTMLToDraft from "html-to-draftjs";

const mailsInitialState = {
  inbox: [],
  inboxTotalMails: 0,
  inboxUnReadMails: 0,
  sentMails: [],

  changed: false,
};

const mailsSlice = createSlice({
  name: "mails",
  initialState: mailsInitialState,

  reducers: {
    retrieveSentMailsFromBackEnd(state, action) {
      if (state.sentMails.length === 0 && action.payload.length > 0) {
        state.sentMails = [...action.payload];
      } else if (state.inbox.length !== 0 && action.payload.length > 0) {
        for (const i of action.payload) {
          let exist = false;
          for (const j of state.sentMails) {
            if (i.key === j.key) {
              exist = true;
              break;
            }
          }
          if (!exist) {
            console.log(i);
            const mailItem = { ...i };
            state.sentMails = [...state.sentMails, mailItem];
          }
        }
      }
    },

    retrieveInboxFromBackEnd(state, action) {
      console.log("from slice store inbox " + action.payload);

      if (state.inbox.length === 0 && action.payload.length > 0) {
        state.inbox = [...action.payload];
        console.log("from slice store " + action.payload);
      } else if (state.inbox.length !== 0 && action.payload.length > 0) {
        for (const i of action.payload) {
          let exist = false;
          for (const j of state.inbox) {
            if (i.key === j.key) {
              exist = true;
              break;
            }
          }
          if (!exist) {
            console.log(i);
            const mailItem = { ...i };
            state.inbox = [...state.inbox, mailItem];
            console.log("This is inside slice " + state.inbox);
          }
        }
      }

      state.inboxTotalMails = action.payload.length;
      const unReadMailsArr = action.payload.filter(
        (mail) => mail.viewed === false
      );
      state.inboxUnReadMails = unReadMailsArr.length;
    },

    addSentItem(state, action) {
      state.sentMails = [...state.sentMails, action.payload];

      console.log(state.sentMails);
    },

    replaceMailItem(state, action) {
      console.log(action.payload);
      const findIndex = state.inbox.findIndex(
        (mail) => mail.key === action.payload
      );
      if (state.inbox[findIndex].viewed === false) {
        state.inboxUnReadMails--;
      }
      state.inbox[findIndex] = { ...state.inbox[findIndex], viewed: true };
    },
    deleteInboxMail(state, action) {
      state.inbox = state.inbox.filter((mail) => mail.key !== action.payload);
      state.inboxTotalMails--;
      if (action.payload.viewed === false) {
        state.inboxUnReadMails--;
      }
    },
    deleteSentMail(state, action) {
      state.sentMails = state.sentMails.filter(
        (mail) => mail.key !== action.payload.key
      );
    },
  },
});

export const mailsSliceActions = mailsSlice.actions;
export default mailsSlice.reducer;
