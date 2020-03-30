import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import API from "./api";
import LoginView from "./components/LoginView";
import CustomerView from "./components/CustomerView";
import RestaurantView from "./components/RestaurantView";
import { Route, Switch } from "react-router-dom";
import ManagerView from "./components/ManagerView";
import RiderView from "./components/RiderView";

export default class App extends Component {
  componentDidMount() {
    console.log(store.getState());
    API.get("/hello").then(res => {
      console.log("Backend is up and running.");
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LoginView} />
          <Route path="/customer" component={CustomerView} />
          <Route path="/restaurant" component={RestaurantView} />
          <Route path="/manager" component={ManagerView} />
          <Route path="/rider" component={RiderView} />
        </Switch>
      </Provider>
    );
  }
}
