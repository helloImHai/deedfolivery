import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Jumbotron, ListGroup } from "react-bootstrap";
import API from "../api";
import Logout from "./Logout";

export class ManagerView extends Component {
  state = {
    email: "",
  };

  fetchUserData() {
    API.get("/get/manager", {
      params: { username: this.props.username },
    })
      .then((res) => {
        console.log("data", res.data[0]);
        this.setState({
          ...this.state,
          id: res.data[0].mid,
          email: res.data[0].email,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  componentWillMount() {
    this.fetchUserData();
  }

  render() {
    return (
      <Container>
        <br />
        <h1>Manager</h1>
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
            {"ID: " + (this.props.id == null ? " - " : this.props.id)}
          </ListGroup.Item>
          <ListGroup.Item>
            {"Email: " + (this.props.email == null ? " - " : this.props.email)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerView);
