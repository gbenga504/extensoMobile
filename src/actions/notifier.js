import * as types from "./types";

export const setToastNotification = message => ({
  type: types.SET_TOAST_NOTIFICATION,
  id: Date.now(),
  message
});

export const setApplicationTheme = theme => ({
  type: types.SET_APPLICATION_THEME,
  theme
});
