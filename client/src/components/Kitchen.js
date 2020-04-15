import React, { Component } from "react";
import { Form, Col, Button, Table, ListGroup } from "react-bootstrap";
import API from "../api";

export default class Kitchen extends Component {
  state = {
    foodItems: [],
    newFoodName: "",
    newCategory: "",
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
  handleCategoryChange = (event) => {
    this.setState({ ...this.state, newCategory: event.target.value });
  };

  fetchRestaurantData(nextProps) {
    console.log("fetching restaurant data");
    console.log("selecting where rid is", nextProps.id);
    API.get("/get/fooditemsbyrid", {
      params: { rid: nextProps.id },
    }).then((res) => {
      this.setState({ ...this.state, foodItems: res.data });
      console.log("data", res.data);
    });
  }

  fetchFoodItems = () => {
    API.get("/get/fooditemsbyrid", {
      params: { rid: this.props.id },
    }).then((res) => {
      this.setState({ ...this.state, foodItems: res.data });
      console.log("data", res.data);
    });
  };

  handleAddNewFoodItem = () => {
    const { id } = this.props;
    const { newFoodName, newFoodPrice, newFoodQuota, newCategory } = this.state;
    if (
      newFoodName == "" ||
      newFoodPrice <= 0 ||
      newFoodQuota < 0 ||
      newCategory == ""
    ) {
      alert("Invalid parameters for new food item");
      return;
    }
    API.post("/post/fooditemtodb", {
      rid: id,
      iname: newFoodName,
      price: newFoodPrice,
      quota: newFoodQuota,
      category: newCategory,
    })
      .then((res) => {
        if (res.data.length == 0) {
          alert("Item not added");
        } else {
          this.fetchFoodItems();
        }
      })
      .catch(() => {
        alert(
          "Add item unsuccessful, check for duplicate name or very long parameters."
        );
      });
  };

  componentWillReceiveProps(nextProps) {
    this.fetchRestaurantData(nextProps);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>Your food items!</h3>
        <br></br>
        <FoodItem
          rid={this.props.id}
          fetchFoodItems={this.fetchFoodItems}
          foodItems={this.state.foodItems}
        ></FoodItem>
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
              <Form.Control
                placeholder="Category"
                onChange={this.handleCategoryChange}
              />
            </Col>
            <Col>
              <Button
                variant="primary"
                style={{ marginRight: "10px" }}
                onClick={this.handleAddNewFoodItem}
              >
                Create
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

class FoodItem extends Component {
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
            <th>Name</th>
            <th>Price</th>
            <th>Quota</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
          {this.props.foodItems.map((item) => (
            <tr key={item.iid}>
              <td>{item.item}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
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
