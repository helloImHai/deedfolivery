import React, { Component } from "react";
import { Form, Col, Button, Table, ListGroup } from "react-bootstrap";
import API from "../api";

export default class Kitchen extends Component {
  state = {
    foodItems: [],
    newFoodName: "",
    newFoodPrice: 0,
    newFoodQuota: 0,
  };

  handleFoodNameChange = (event) => {
    this.setState({ ...this.state, newFoodName: event.target.value });
  };
  handlePriceChange = (event) => {
    this.setState({ ...this.state, newFoodPrice: event.target.value });
  };
  handleQuotaChange = (event) => {
    this.setState({ ...this.state, newFoodQuota: event.target.value });
  };

  fetchRestaurantData(nextProps) {
    console.log("fetching restaurant data");
    console.log("selecting where rid is", nextProps.id);
    API.get("/get/fooditems", {
      params: { rid: nextProps.id },
    }).then((res) => {
      this.setState({ ...this.state, foodItems: res.data });
      console.log("data", res.data);
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log("fetching restaurant data");
    this.fetchRestaurantData(nextProps);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>Your food items!</h3>
        <br></br>
        <FoodItem foodItems={this.state.foodItems}></FoodItem>
        <br></br>
        <h3>Add more food items!</h3>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                placeholder="Food item name"
                onChange={this.handleFoodNameChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Price"
                type="number"
                onChange={this.handlePriceChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Quota"
                type="number"
                onChange={this.handleQuotaChange}
              />
            </Col>
            <Col>
              <Button variant="primary" style={{ marginRight: "10px" }}>
                Create
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

const FoodItem = ({ foodItems }) => (
  <div>
    <Table id="students">
      <tbody>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quota</th>
        </tr>
        {foodItems.map((item) => (
          <tr horizontal key={item.iid}>
            <td>{item.iname}</td>
            <td>{item.price}</td>
            <td>{item.quota}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
