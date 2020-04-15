import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Jumbotron, ListGroup } from "react-bootstrap";
import API from "../api";
import Logout from "./Logout";

export class CustomerView extends Component {
  state = {
    cname: "",
    email: "",
    address: "",
    points: 0,
    card: 0
  };

  fetchUserData() {
    API.get("/get/customer", {
      params: { username: this.props.username }
    }).then(res => {
      console.log("data", res.data[0]);
      this.setState({
        ...this.state,
        cname: res.data[0].cname,
        email: res.data[0].email,
        address: res.data[0].address,
        points: res.data[0].points,
        card: res.data[0].card
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
        <h1>Customer</h1>
        <br />
        <User {...this.state} username={this.props.username}></User>
        <Button variant="primary" href="/menuview" > <a >Order Food</a></Button>
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
            {"Name: " + (this.props.cname == null ? " - " : this.props.cname)}
          </ListGroup.Item>
          <ListGroup.Item>
            {"Card: " + (this.props.card == null ? " - " : this.props.card)}
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
              (this.props.points == null ? " - " : this.props.points)}
          </ListGroup.Item>
          <ListGroup.Item>
            {"Card: " + (this.props.card == null ? " - " : this.props.card)}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerView);
