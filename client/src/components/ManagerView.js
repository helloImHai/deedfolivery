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
} from "react-bootstrap";
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
        <RidersList {...this.state} />
        <br />
        <PendingOrders {...this.state} />
        <br />
        <AssignedOrders {...this.state} />
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
        <h2>Riders</h2>
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
  };
  componentWillMount() {
    API.get("/get/allpendingorders")
      .then((res) => {
        this.setState({
          ...this.state,
          pendingOrders: res.data,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.riderid.value);
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
                        style={{ width: 100, marginRight: 10 }}
                        placeholder={0}
                        type="number"
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
      </div>
    );
  }
}

class AssignedOrders extends Component {
  state = {
    assignedOrders: [],
  };
  componentWillReceiveProps(nextProps) {
    // console.log("received props", nextProps);
    API.get("/get/assignedordersbymid", {
      params: { mid: nextProps.id },
    })
      .then((res) => {
        this.setState({
          ...this.state,
          assignedOrders: res.data,
        });
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
              <th>Cost</th>
              <th>Reward</th>
              <th>Address</th>
            </tr>
            {this.state.assignedOrders.map((order) => (
              <tr key={order.oid}>
                <td>{order.oid}</td>
                <td>{order.cost}</td>
                <td>{order.reward}</td>
                <td>{order.address}</td>
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
