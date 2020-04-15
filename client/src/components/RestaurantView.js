import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Jumbotron,
  ListGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
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
    })
      .then((res) => {
        console.log("data", res.data[0]);
        this.setState({
          ...this.state,
          id: res.data[0].rid,
          rname: res.data[0].rname,
          email: res.data[0].email,
          address: res.data[0].address,
          minspend: res.data[0].minspend,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  componentWillMount() {
    this.fetchUserData();
  }

  handleSubmitEdit = (event) => {
    event.preventDefault();
    console.log(event.target.email.value);
    const email = event.target.email.value;
    const password = event.target.password.value;
    const rname = event.target.name.value;
    const address = event.target.address.value;
    const minspend = event.target.minspend.value;
    if (
      email == "" ||
      password == "" ||
      address == "" ||
      rname == "" ||
      minspend == ""
    ) {
      alert("Make sure all fields are not null");
      return;
    }
    API.put("/put/restauranttodb", {
      rname: rname,
      email: email,
      password: password,
      address: address,
      minspend: minspend,
      rid: this.state.id,
    })
      .then(() => this.fetchUserData())
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    return (
      <Container>
        <br />
        <h1>Restaurant</h1>
        <br />
        <User {...this.state} username={this.props.username}></User>
        <br />

        <Jumbotron>
          <h2>Edit Restaurant</h2>
          <br />
          <Form onSubmit={this.handleSubmitEdit}>
            <Form.Group as={Row} name="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control name="email" placeholder={this.state.email} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} name="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control name="password" placeholder={""} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} name="formPlaintextName">
              <Form.Label column sm="2">
                Restaurant Name
              </Form.Label>
              <Col sm="10">
                <Form.Control name="name" placeholder={this.state.rname} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} name="formPlaintextAddress">
              <Form.Label column sm="2">
                Restaurant Address
              </Form.Label>
              <Col sm="10">
                <Form.Control name="address" placeholder={this.state.address} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} name="formPlaintextMinSpend">
              <Form.Label column sm="2">
                Minimum Spend
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  name="minspend"
                  placeholder={this.state.minspend}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Edit
              </Form.Label>
              <Col sm="100">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginLeft: 15 }}
                >
                  Confirm
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Jumbotron>
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
            {"Minimum Spend: " +
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
