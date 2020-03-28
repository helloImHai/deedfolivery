import { combineReducers } from "redux";
import userReducer from "./userReducer";
import "bootstrap/dist/css/bootstrap.min.css";

export default combineReducers({ user: userReducer });
