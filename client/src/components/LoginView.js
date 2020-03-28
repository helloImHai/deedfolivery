import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";
import API from "../api";
import { updateUsername, updatePassword } from "../actions/userActions";

export class LoginView extends Component {
  handleSignUp = () => {
    console.log("sign up with", this.props);
    API.post(`http://localhost:5000/api/post/customertodb`, {
      username: this.props.username,
      password: this.props.password
    }).then(res => {
      console.log(res.statusText);
    });
  };
  handleUsernameChange = event => {
    this.props.handleUsernameChange(event.target.value);
  };
  handlePasswordChange = event => {
    this.props.handlePasswordChange(event.target.value);
  };
  render() {
    return (
      <Container className="container-sm" style={{ marginTop: "50px" }}>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              onChange={this.handleUsernameChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </Form.Group>
          <Button variant="primary" style={{ marginRight: "10px" }}>
            Sign in
          </Button>
          <Button variant="secondary" onClick={this.handleSignUp}>
            Sign up
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  password: state.user.password
});

const mapDispatchToProps = dispatch => {
  return {
    handleUsernameChange: username => {
      dispatch(updateUsername(username));
    },
    handlePasswordChange: password => {
      dispatch(updatePassword(password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
