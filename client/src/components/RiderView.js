import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Jumbotron, ListGroup } from "react-bootstrap";
import API from "../api";
import Logout from "./Logout";

export class RiderView extends Component {
  state = {
    email: "",
    delivered: 0
  };

  fetchUserData() {
    API.get("/get/rider", {
      params: { username: this.props.username }
    }).then(res => {
      console.log("data", res.data[0]);
      this.setState({
        ...this.state,
        email: res.data[0].email,
        delivered: res.data[0].delivered
      });
    });
  }

  componentWillMount() {
    this.fetchUserData();
  }

  render() {
    return (
      <Container>
        <br />
        <h1>Rider</h1>
        <br />
        <User {...this.state} username={this.props.username}></User>
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
            {"Email: " + (this.props.email == null ? " - " : this.props.email)}
          </ListGroup.Item>
          <ListGroup.Item>
            {"Delivered: " +
              (this.props.delivered == null ? " - " : this.props.delivered)}
          </ListGroup.Item>
        </ListGroup>
      </Jumbotron>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  password: state.user.password,
  userType: state.user.userType
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RiderView);
