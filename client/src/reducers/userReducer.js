import {
  UPDATE_HEIGHT_ABOUT,
  UPDATE_HEIGHT_EXP,
  UPDATE_HEIGHT_SKILLS,
  UPDATE_PASSWORD,
  UPDATE_USERNAME
} from "../actions/types.js";

const initialState = {
  username: "",
  password: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_HEIGHT_ABOUT:
      return { ...state, about: payload };
    case UPDATE_HEIGHT_EXP:
      return { ...state, experience: payload };
    case UPDATE_HEIGHT_SKILLS:
      return { ...state, skills: payload };
    case UPDATE_USERNAME:
      return { ...state, username: payload };
    case UPDATE_PASSWORD:
      return { ...state, password: payload };
    default:
      return state;
  }
};
