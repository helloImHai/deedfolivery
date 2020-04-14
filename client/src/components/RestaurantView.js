import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Jumbotron, ListGroup } from "react-bootstrap";
import API from "../api";
import Logout from "./Logout";
import Kitchen from "./Kitchen";

export class RestaurantView extends Component {
  state = {
    rname: "",
    email: "",
    address: "",
    minspend: 0,
    id: -1,
  };

  fetchUserData() {
    API.get("/get/restaurant", {
      params: {
        username: this.props.username,
      },
    }).then((res) => {
      console.log("data", res.data[0]);
      this.setState({
        ...this.state,
        id: res.data[0].rid,
        rname: res.data[0].rname,
        email: res.data[0].email,
        address: res.data[0].address,
        minspend: res.data[0].minspend,
      });
    });

    API.get("/get/restaurantwithpassword", {
      params: {
        username: this.props.username,
        password: this.props.password,
      },
    }).then((res) => {
      console.log("get with password", res.data[0]);
    });
  }

  componentWillMount() {
    this.fetchUserData();
  }

  render() {
    return (
      <Container>
        <br />
        <h1>Restaurant</h1>
        <br />
        <User {...this.state} username={this.props.username}></User>
        <br />
        <Kitchen {...this.state}></Kitchen>
        <br />
        <br />
        <Logout history={this.props.history}></Logout>
      </Container>
    );
  }
}

class User extends Component {
  render() {
    return (
      <Jumbotron>
        <h3>Hello, {this.props.username}</h3>
        <p>Welcome to our application.</p>
        <ListGroup variant="flush">
          <ListGroup.Item>
            {"Name: " + (this.props.rname == null ? " - " : this.props.rname)}
          </ListGroup.Item>
          <ListGroup.Item>
            {"Address: " +
              (this.props.address == null ? " - " : this.props.address)}
          </ListGroup.Item>
          <ListGroup.Item>
            {"Email: " + (this.props.email == null ? " - " : this.props.email)}
          </ListGroup.Item>
          <ListGroup.Item>
            {"Points: " +
              (this.props.minspend == null ? " - " : this.props.minspend)}
          </ListGroup.Item>
        </ListGroup>
      </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  password: state.user.password,
  userType: state.user.userType,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantView);
