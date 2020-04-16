import React, { Component } from "react";
import { Form, Col, Button, Table, ListGroup } from "react-bootstrap";
import API from "../api";

export default class CustomerUpdate extends Component {
  state = {
    sellsItems: [],
  };



  fetchOrderData(nextProps) {
    console.log("fetching customer data");
    console.log("selecting where cid is", nextProps.id);
    API.get("/get/placeitembycid", {
      params: { cid: nextProps.id },
    }).then((res) => {
      console.log("data for res", res);
      this.setState({ ...this.state, sellsItems: res.data });
    });
  }

  fetchSellsItems = () => {
    API.get("/get/placeitembycid", {
      params: { cid: this.props.id },
    }).then((res) => {
      this.setState({ ...this.state, sellsItems: res.data });
      console.log("data for res", res.data);
    });
  };

  componentWillReceiveProps(nextProps) {
    this.fetchOrderData(nextProps);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>Your past orders</h3>
        <br></br>
        <OrderItem
          cid={this.props.id}
          fetchSellsItems={this.fetchSellsItems}
          sellsItems={this.state.sellsItems}
        ></OrderItem>
        <br></br>
      </div>
    );
  }
}

class OrderItem extends Component {
  render() {
    return (
      <Table id="students">
        <tbody>
          <tr>
            <th>Oid</th>
            <th>Payment Type</th>
            <th>Cost</th>
            <th>Address</th>
          </tr>
          {this.props.sellsItems.map((item) => (
            <tr key={item.oid}>
              <td>{item.oid}</td>
              <td>{item.paytype}</td>
              <td>{item.cost}</td>
              <td>{item.address}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
