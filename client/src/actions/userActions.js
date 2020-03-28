import { UPDATE_USERNAME, UPDATE_PASSWORD } from "./types.js";

export const updateUsername = username => ({
  type: UPDATE_USERNAME,
  payload: username
});

export const updatePassword = password => ({
  type: UPDATE_PASSWORD,
  payload: password
});
