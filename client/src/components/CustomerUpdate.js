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
      this.setState({ ...this.state, sellsItems: res.data });
      console.log("data", res.data);
    });
  }

  fetchSellsItems = () => {
    API.get("/get/placeitembycid", {
      params: { cid: this.props.id },
    }).then((res) => {
      this.setState({ ...this.state, sellsItems: res.data });
      console.log("data", res.data);
    });
  };

  componentWillReceiveProps(nextProps) {
    this.fetchOrderData(nextProps);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>Your order items!</h3>
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
  handleDelete = (item) => {
    console.log("deleting", item);
    console.log(this.props.rid);
    API.delete("/delete/fooditembyiid", {
      data: { iid: item.iid },
    }).then(() => this.props.fetchFoodItems());
  };
  render() {
    return (
      <Table id="students">
        <tbody>
          <tr>
            <th>Cid</th>
            <th>Oid</th>
            <th>Payment Type</th>
            <th>Cost</th>
            <th>Address</th>
          </tr>
          {this.props.sellsItems.map((item) => (
            <tr key={item.cid}>
              <td>{item.oid}</td>
              <td>{item.paytype}</td>
              <td>{item.cost}</td>
              <td>{item.address}</td>
              <td>
                <Button onClick={this.handleDelete.bind(this, item)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
