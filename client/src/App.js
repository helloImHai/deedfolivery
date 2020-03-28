import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import API from "./api";
import LoginView from "./components/LoginView";
import CustomerView from "./components/CustomerView";
import { Route, Switch } from "react-router-dom";

export default class App extends Component {
  componentDidMount() {
    console.log(store.getState());
    API.get("/hello").then(res => {
      console.log(res.data);
      console.log("Backend is up and running.");
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LoginView} />
          <Route path="/customer" component={CustomerView} />
        </Switch>
      </Provider>
    );
  }
}
