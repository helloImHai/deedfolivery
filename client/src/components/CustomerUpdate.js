import React, { Component } from "react";
import { Form, Col, Button, Table, ListGroup } from "react-bootstrap";
import API from "../api";

export default class CustomerUpdate extends Component {
  state = {
    cid: -1,
    sellsItems: [],

  };



  fetchOrderData(nextProps) {
    console.log("fetching customer data");
    console.log("selecting where cid is", nextProps.id);
    API.get("/get/placeitembycid", {
      params: { cid: nextProps.id },
    }).then((res) => {
      console.log("data for res", res);
      this.state.cid = nextProps.id;
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
  state ={
    review: "",
    ratings: ""
  }
  handleSend = (item) => {
    console.log(item);
    API.post("/post/giveReview", {
      review : this.state.review,
      ratings: this.state.ratings,
      cid: item.cid,
      oid: item.oid
    }).then((res) =>{
        alert("Added!");
    }).catch((err) => {
      alert("You have Reviewed this");
    });
  }
  handleReviewChange = (event) => {
    console.log(event)
    this.setState({
      review: event.target.value
    });
  };
  handleRatingChange = (event) => {
    this.setState({
      ratings: event.target.value
    });
  };
  render() {
    return (
      <Table id="students">
        <tbody>
          <tr>
            <th>Oid</th>
            <th>Payment Type</th>
            <th>Cost</th>
            <th>Address</th>
            <th>Review</th>
          </tr>
          {this.props.sellsItems.map((item) => (
            <tr key={item.oid}>
              <td>{item.oid}</td>
              <td>{item.paytype}</td>
              <td>{item.cost}</td>
              <td>{item.address}</td>

              <td><Button onClick={this.handleSend.bind(this, item)}>
                Send
              </Button></td>
            </tr>
          ))}
          <tr>
          <td><input type="text" placeholder="Review" onChange={this.handleReviewChange} value={this.state.review}/> <input type="text" placeholder="Ratings" value={this.state.ratings} onChange={this.handleRatingChange}/></td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
