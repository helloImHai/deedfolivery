import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Jumbotron } from "react-bootstrap";

export class CustomerView extends Component {
  render() {
    console.log("customer view", this.props);
    return (
      <div>
        <h3>Customer</h3>
        <User username={this.props.username}></User>
      </div>
    );
  }
}

class User extends Component {
  render() {
    console.log(this.props);
    return (
      <Jumbotron>
        <h1>Hello, {this.props.username}</h1>
        <p>Welcome to our application.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerView);
