import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Jumbotron,
  ListGroup,
  Table,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import moment from "moment";
import API from "../api";
import Logout from "./Logout";

export class RiderView extends Component {
  state = {
    email: "",
    delivered: 0,
    name: "",
    id: -1,
  };

  fetchUserData = () => {
    console.log("Fetch data");
    API.get("/get/rider", {
      params: { username: this.props.username },
    })
      .then((res) => {
        console.log("data", res.data[0]);
        this.setState({
          ...this.state,
          email: res.data[0].email,
          name: res.data[0].ridername,
          delivered: res.data[0].delivered,
          id: res.data[0].riderid,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  componentWillMount() {
    this.fetchUserData();
  }

  handleSubmitEdit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const ridername = event.target.name.value;
    if (email == "" || password == "" || ridername == "") {
      alert("Make sure all fields are not null");
      return;
    }
    API.put("/put/ridertodb", {
      ridername: ridername,
      email: email,
      password: password,
      riderid: this.state.id,
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
        <h1>Rider</h1>
        <br />
        <User {...this.state} username={this.props.username}></User>
        <br />
        <Jumbotron>
          <h2>Edit Rider Details</h2>
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
                Rider Name
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
        <PendingAssignments {...this.state} />
        <br />
        <Logout history={this.props.history}></Logout>
      </Container>
    );
  }
}

class PendingAssignments extends Component {
  state = {
    riderid: -1,
    delivered: 0,
    assignments: [],
  };

  componentWillReceiveProps(nextProps) {
    console.log("Rider receiving props", nextProps);
    if (nextProps.id >= 0) {
      this.setState({ riderid: nextProps.id });
      this.fetchDeliveries(nextProps.id);
    }
  }

  fetchDeliveries = (riderid) => {
    API.get("/get/assignedordersbyriderid", {
      params: { riderid: riderid },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          assignments: res.data,
          delivered: res.data.filter((x) => x.deliverytime != null).length,
        });
        console.log("assign", this.state);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  submitAcceptTime = () => {
    event.preventDefault();
    const orderid = event.target.orderid.value;
    API.put("/put/accepttime", {
      accepttime: Date.now(),
      orderid: orderid,
    })
      .then(() => this.fetchDeliveries(this.state.riderid))
      .catch((err) => {
        alert(err.message);
      });
  };
  submitReachedTime = () => {
    event.preventDefault();
    const orderid = event.target.orderid.value;
    API.put("/put/reachedtime", {
      reachedtime: Date.now(),
      orderid: orderid,
    })
      .then(() => this.fetchDeliveries(this.state.riderid))
      .catch((err) => {
        alert("You must accept the order first!");
      });
  };
  submitLeaveTime = () => {
    event.preventDefault();
    const orderid = event.target.orderid.value;
    API.put("/put/leavetime", {
      leavetime: Date.now(),
      orderid: orderid,
    })
      .then(() => this.fetchDeliveries(this.state.riderid))
      .catch((err) => {
        alert("You must indicate that you have reached the restaurant first!");
      });
  };
  submitDeliveryTime = () => {
    event.preventDefault();
    const orderid = event.target.orderid.value;
    API.put("/put/deliverytime", {
      deliverytime: Date.now(),
      orderid: orderid,
    })
      .then(() => this.fetchDeliveries(this.state.riderid))
      .then(() => {
        API.put("/put/updatedelivered", { riderid: this.state.riderid });
      })
      .catch((err) => {
        alert("You must indicate that you have left the restaurant first!");
      });
  };

  render() {
    return (
      <div>
        <h2>Deliveries</h2>
        <h3>Successful deliveries: {this.state.delivered}</h3>
        <br />
        <Table id="pendingDeliveries">
          <tbody>
            <tr>
              <th>Order ID</th>
              <th>Collect</th>
              <th>Rider Fee</th>
              <th>Address</th>
              <th style={{ maxWidth: 100 }}>Accept</th>
              <th style={{ maxWidth: 100 }}>Reached Restaurant</th>
              <th style={{ maxWidth: 100 }}>Left Restaurant</th>
              <th style={{ maxWidth: 100 }}>Delivered</th>
            </tr>
            {this.state.assignments.map((assign) => (
              <tr key={assign.oid}>
                <td>{assign.oid}</td>
                <td>{assign.cost}</td>
                <td>{assign.riderfee}</td>
                <td>{assign.address}</td>
                <td style={{ maxWidth: 100 }}>
                  {assign.accepttime == null ? (
                    <Form onSubmit={this.submitAcceptTime}>
                      <Form.Row>
                        <Form.Control
                          name="orderid"
                          style={{ width: 0, padding: 0, visibility: "hidden" }}
                          value={assign.oid}
                          readOnly
                        />
                        <Button type="submit">Done</Button>
                      </Form.Row>
                    </Form>
                  ) : (
                    moment(assign.accepttime).format("LLLL")
                  )}
                </td>
                <td style={{ maxWidth: 100 }}>
                  {assign.reachedtime == null ? (
                    <Form onSubmit={this.submitReachedTime}>
                      <Form.Row>
                        <Form.Control
                          name="orderid"
                          style={{ width: 0, padding: 0, visibility: "hidden" }}
                          value={assign.oid}
                          readOnly
                        />
                        <Button type="submit">Done</Button>
                      </Form.Row>
                    </Form>
                  ) : (
                    moment(assign.reachedtime).format("LLLL")
                  )}
                </td>
                <td style={{ maxWidth: 100 }}>
                  {assign.leavetime == null ? (
                    <Form onSubmit={this.submitLeaveTime}>
                      <Form.Row>
                        <Form.Control
                          name="orderid"
                          style={{ width: 0, padding: 0, visibility: "hidden" }}
                          value={assign.oid}
                          readOnly
                        />
                        <Button type="submit">Done</Button>
                      </Form.Row>
                    </Form>
                  ) : (
                    moment(assign.leavetime).format("LLLL")
                  )}
                </td>
                <td style={{ maxWidth: 100 }}>
                  {assign.deliverytime == null ? (
                    <Form onSubmit={this.submitDeliveryTime}>
                      <Form.Row>
                        <Form.Control
                          name="orderid"
                          style={{ width: 0, padding: 0, visibility: "hidden" }}
                          value={assign.oid}
                          readOnly
                        />
                        <Button type="submit">Done</Button>
                      </Form.Row>
                    </Form>
                  ) : (
                    moment(assign.leavetime).format("LLLL")
                  )}
                </td>
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
            {"Rider Name: " +
              (this.props.name == null ? " - " : this.props.name)}
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

export default connect(mapStateToProps, mapDispatchToProps)(RiderView);
