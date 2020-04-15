import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Jumbotron,
  ListGroup,
  Table,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import API from "../api";
import Logout from "./Logout";

export class ManagerView extends Component {
  state = {
    email: "",
    count: 0,
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
          mname: res.data[0].mname,
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
    const mname = event.target.name.value;
    console.log(this.state.id, email, password, mname);
    if (email == "" || password == "" || mname == "") {
      alert("Make sure all fields are not null");
      return;
    }
    API.put("/put/managertodb", {
      mname: mname,
      email: email,
      password: password,
      mid: this.state.id,
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
        <h1>Manager</h1>
        <br />
        <User {...this.state} username={this.props.username}></User>
        <br />

        <Jumbotron>
          <h2>Edit Manager Details</h2>
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
                Manager Name
              </Form.Label>
              <Col sm="10">
                <Form.Control name="name" placeholder={this.state.rname} />
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
        <RidersList {...this.state} />
        <br />
        <PendingOrders {...this.state} />
        <br />
        <Logout history={this.props.history}></Logout>
      </Container>
    );
  }
}

class RidersList extends Component {
  state = {
    riders: [],
  };
  componentWillMount() {
    API.get("/get/allriders")
      .then((res) => {
        this.setState({
          ...this.state,
          riders: res.data,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  render() {
    return (
      <div>
        <h2>Available Riders</h2>
        <br />
        <Table id="availableriders">
          <tbody>
            <tr>
              <th>Driver Id</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
            {this.state.riders.map((rider) => (
              <tr key={rider.riderid}>
                <td>{rider.riderid}</td>
                <td>{rider.username}</td>
                <td>{rider.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

class PendingOrders extends Component {
  state = {
    pendingOrders: [],
    assignedOrders: [],
    id: this.props.id,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, id: nextProps.id });
    this.fetchPendingOrders();
  }

  fetchPendingOrders() {
    console.log("Fetching");
    API.get("/get/allpendingorders")
      .then((res) => {
        console.log("old pending orders", this.state.pendingOrders);
        this.setState({
          ...this.state,
          pendingOrders: res.data,
        });
        console.log("new pending orders", this.state.pendingOrders);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const riderid = event.target.riderid.value;
    const orderid = event.target.orderid.value;
    const price = event.target.price.value;
    if (riderid == null) {
      alert("Rider ID cannot be null");
      return;
    }
    API.post("/post/assigntodb", {
      rid: riderid,
      oid: orderid,
      mid: this.props.id,
      managerFee: (price * 0.02) / 1.07,
      riderFee: (price * 0.05) / 1.07,
    })
      .then(() => this.fetchPendingOrders())
      .catch((err) => {
        alert("Please choose a rid that is in the Riders list above");
      });
  };

  render() {
    return (
      <div>
        <h2>Pending Orders</h2>
        <br />
        <Table id="pendingOrders">
          <tbody>
            <tr>
              <th>Order Id</th>
              <th>Cost</th>
              <th>Reward</th>
              <th>Address</th>
              <th>Assign Rider</th>
            </tr>
            {this.state.pendingOrders.map((order) => (
              <tr key={order.oid}>
                <td>{order.oid}</td>
                <td>{order.cost}</td>
                <td>{order.reward}</td>
                <td>{order.address}</td>
                <td>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                      <Form.Control
                        name="riderid"
                        style={{ width: 80 }}
                        placeholder={0}
                        type="number"
                      />
                      <Form.Control
                        name="orderid"
                        style={{ width: 0, padding: 2, visibility: "hidden" }}
                        value={order.oid}
                        readOnly
                      />
                      <Form.Control
                        name="price"
                        style={{ width: 0, padding: 2, visibility: "hidden" }}
                        value={order.cost}
                        readOnly
                      />
                      <Button type="submit">Assign</Button>
                    </Form.Row>
                  </Form>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
        <AssignedOrders {...this.state}></AssignedOrders>
      </div>
    );
  }
}

class AssignedOrders extends Component {
  state = {
    assignedOrders: [],
  };
  componentWillReceiveProps(nextProps) {
    console.log("received props", nextProps);
    API.get("/get/assignedordersbymid", {
      params: { mid: nextProps.id },
    })
      .then((res) => {
        this.setState({
          ...this.state,
          assignedOrders: res.data,
        });
        console.log("assign", this.state);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  render() {
    return (
      <div>
        <h2>Assigned Orders</h2>
        <br />
        <Table id="assignedOrders">
          <tbody>
            <tr>
              <th>Order Id</th>
              <th>Rider Id</th>
              <th>Rider Fee</th>
              <th>Manager Fee</th>
            </tr>
            {this.state.assignedOrders.map((assign) => (
              <tr key={assign.oid}>
                <td>{assign.oid}</td>
                <td>{assign.riderid}</td>
                <td>{assign.riderfee}</td>
                <td>{assign.managerfee}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
            {"Name: " + (this.props.mname == null ? " - " : this.props.mname)}
          </ListGroup.Item>
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
