import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Col, Form ,  Jumbotron, ListGroup } from "react-bootstrap";
import API from "../api";
import Logout from "./Logout";
import CustomerUpdate from "./CustomerUpdate";
import MenuView from "./MenuView"

export class CustomerView extends Component {
  state = {
    cname: "",
    email: "",
    address: "",
    points: 0,
    card: 0,
    id: -1,

    newCustName: "",
    newAddress: "",
    newEmail: "",
    newCard: 0,
  };

  handleCusNameChange = (event) => {
    this.setState({ ...this.state, newCustName: event.target.value });
  };
  handleAddressChange = (event) => {
    this.setState({ ...this.state, newAddress: event.target.value });
  };
  handleEmailChange = (event) => {
    this.setState({ ...this.state, newEmail: event.target.value });
  };
  handleCardChange = (event) => {
    this.setState({ ...this.state, newCard: event.target.value });
  };

  handleUpdateCustItem = (event) => {

    API.post("/post/custupdatetodb", {
      cid: this.state.id,
      custname: this.state.newCustName,
      address: this.state.newAddress,
      email: this.state.newEmail,
      card: this.state.newCard,
    })
      .then((res) => {
        if (res.data.length == 0) {
          alert("Customer Not updated");
        } else {
          alert("Customer Successfully Updated");
          this.fetchUserData();
        }
      })
      .catch(() => {
        alert(
          "Add item unsuccessful, check for duplicate name or very long parameters."
        );
      });
  };

  fetchUserData() {
    API.get("/get/customer", {
      params: { username: this.props.username },
    })
      .then((res) => {
        console.log("data", res.data[0]);
        this.setState({
          ...this.state,
          cname: res.data[0].cname,
          email: res.data[0].email,
          address: res.data[0].address,
          points: res.data[0].points,
          card: res.data[0].card,
          id: res.data[0].cid,
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
        <h1>Customer</h1>
        <br />
        <User {...this.state} username={this.props.username}></User>
        <CustomerUpdate {...this.state}></CustomerUpdate>
        <h3>Update Customer details Here!</h3>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                placeholder="New Customer Name"
                onChange={this.handleCusNameChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Address"
                onChange={this.handleAddressChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="email"
                onChange={this.handleEmailChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Card"
                type="number"
                onChange={this.handleCardChange}
              />
            </Col>
            <Col>
              <Button
                variant="primary"
                style={{ marginRight: "10px" }}
                onClick={this.handleUpdateCustItem}
              >
                Update
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <h2> Order Menu </h2>
        <MenuView {...this.state}></MenuView>
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

const mapStateToProps = (state) => ({
  username: state.user.username,
  password: state.user.password,
  userType: state.user.userType,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerView);
