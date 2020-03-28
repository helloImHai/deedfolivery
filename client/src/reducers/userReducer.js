import {
  UPDATE_PASSWORD,
  UPDATE_USERNAME,
  UPDATE_USER_TYPE
} from "../actions/types.js";

const initialState = {
  username: "",
  password: "",
  userType: "customer"
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USERNAME:
      return { ...state, username: payload };
    case UPDATE_PASSWORD:
      return { ...state, password: payload };
    case UPDATE_USER_TYPE:
      return { ...state, userType: payload };
    default:
      return state;
  }
};
