import {
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
  UPDATE_USER_TYPE,
  RESET_STATE,
} from "./types.js";

export const updateUsername = (username) => ({
  type: UPDATE_USERNAME,
  payload: username,
});

export const updatePassword = (password) => ({
  type: UPDATE_PASSWORD,
  payload: password,
});

export const updateUserType = (userType) => ({
  type: UPDATE_USER_TYPE,
  payload: userType,
});

export const resetState = () => ({
  type: RESET_STATE,
  payload: "",
});
