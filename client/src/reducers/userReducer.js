import {
  UPDATE_PASSWORD,
  UPDATE_USERNAME,
  UPDATE_USER_TYPE,
  RESET_STATE,
} from "../actions/types.js";

const initialState = {
  username: "",
  password: "",
  userType: "customer",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USERNAME:
      return { ...state, username: payload };
    case UPDATE_PASSWORD:
      return { ...state, password: payload };
    case UPDATE_USER_TYPE:
      return { ...state, userType: payload };
    case RESET_STATE:
      return { ...state, username: "", password: "", userType: "customer" };
    default:
      return state;
  }
};
