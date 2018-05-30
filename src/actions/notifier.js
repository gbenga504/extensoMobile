import * as types from "./types";

export const setReadingMode = () => ({
  type: types.SET_READING_MODE
});


export const setToastNotification = (message) => ({
  type: types.SET_TOAST_NOTIFICATION,
  id: Date.now(),
  message
})