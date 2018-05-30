import * as types from "../actions/types";

export const readingMode = (state = "day", action) => {
  switch (action.type) {
    case types.SET_READING_MODE:
      let _newMode = state === "day" ? "night" : "day";
      return _newMode;
      break;
    default:
      return state;
      break;
  }
};

export const toastNotification = (state = {}, action) => {
  switch (action.type) {
    case types.SET_TOAST_NOTIFICATION:
      return { ...state, id: action.id, message: action.message };
      break;
    default:
      return state;
      break;
  }
};

export const applicationTheme = (state = {}, action) => {
  switch (action.type) {
    case types.SET_APPLICATION_THEME:
      return { ...state, ...action.theme };
      break;
    default:
      return state;
      break;
  }
};
