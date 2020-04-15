import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Jumbotron,
  ListGroup,
  Table,
  Form,
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

  render() {
    return (
      <Container>
        <br />
        <h1>Rider</h1>
        <br />
        <User {...this.state} username={this.props.username}></User>
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
    }).then(() => this.fetchDeliveries(this.state.riderid));
    // console.log(moment(Date.now()).unix().format());
  };
  submitReachedTime = () => {
    event.preventDefault();
    const orderid = event.target.orderid.value;
    API.put("/put/reachedtime", {
      reachedtime: Date.now(),
      orderid: orderid,
    }).then(() => this.fetchDeliveries(this.state.riderid));
    // console.log(moment(Date.now()).unix().format());
  };
  submitLeaveTime = () => {
    event.preventDefault();
    const orderid = event.target.orderid.value;
    API.put("/put/leavetime", {
      leavetime: Date.now(),
      orderid: orderid,
    }).then(() => this.fetchDeliveries(this.state.riderid));
    // console.log(moment(Date.now()).unix().format());
  };
  submitDeliveryTime = () => {
    event.preventDefault();
    const orderid = event.target.orderid.value;
    API.put("/put/deliverytime", {
      deliverytime: Date.now(),
      orderid: orderid,
    }).then(() => this.fetchDeliveries(this.state.riderid));
    // console.log(moment(Date.now()).unix().format());
  };

  render() {
    return (
      <div>
        <h2>Deliveries</h2>
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
                        <Button type="submit">Assign</Button>
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
                        <Button type="submit">Assign</Button>
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
                        <Button type="submit">Assign</Button>
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
                        <Button type="submit">Assign</Button>
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
            {"Delivered: " +
              (this.props.name == null ? " - " : this.props.name)}
          </ListGroup.Item>
          <ListGroup.Item>
            {"Email: " + (this.props.email == null ? " - " : this.props.email)}
          </ListGroup.Item>
          <ListGroup.Item>
            {"Number Items Delivered: " +
              (this.props.delivered == null ? " - " : this.props.delivered)}
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
