import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Col,
  Form,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  Dropdown
} from "react-bootstrap";
import API from "../api";
import {
  updateUsername,
  updatePassword,
  updateUserType
} from "../actions/userActions";




class MenuView extends Component {

  constructor(props) {
      super(props);
    }
  state = {
      restaurant: [],
      selectedRestaurant: "",
      food:[],
      selectedFood: "",
      selectedFoodCost: 0,
      selectedOption: "card",
      amt: 0,
      order: [
      ],
      orderId: 0,
      totalCost: 0,
      totalCostDel:0,
      oidFromServer:0,
      Selectediid: 0,
      pending: []
    };

    componentDidMount() {
      API.get(`http://localhost:5000/api/get/restaurantName`)
        .then((response) => {
          return response.data
      })
        .then(data => {
          console.log(data)
          let resFromApi = data.map(restaurant => {
            return { value: restaurant.rname, display: restaurant.rname };
          });
          this.setState({
            restaurant: [
              {
                value: "",
                display:
                  "(Select a restaurant)"
              }
            ].concat(resFromApi)
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    handleAmtChange = (event) => {
      this.setState({ ...this.state, amt: event.target.value });
    };

    handleOptionChange = (event) => {
      this.setState({...this.state, selectedOption: event.target.value})
    }

    handleDelete = (item) => {
      console.log("deleting", item);
      for(let b = 0; b < this.state.order.length; b++){
        if(this.state.order[b].id == item.id){
          this.state.order.splice(b, 1);
          this.state.totalCost -= item.cost * item.amt;
          this.state.totalCostDel = this.state.totalCost * 1.07;
        }
      }
      this.forceUpdate();
    };

  handleTempOrder = (event) => {
    for(let i = 0; i < this.state.food.length; i ++){
      if(this.state.food[i].value == this.state.selectedFood) {
        this.state.selectedFoodCost = this.state.food[i].cost;
        this.state.Selectediid = this.state.food[i].iid;
      }
    };
    var temp = {id: this.state.orderId + 1, food: this.state.selectedFood, amt: this.state.amt, cost: this.state.selectedFoodCost, fid: this.state.Selectediid};
    this.state.orderId = this.state.orderId + 1;
    this.state.totalCost += (this.state.amt * this.state.selectedFoodCost);
    this.state.order.push(temp);
    console.log(this.state.order);
    this.state.totalCostDel = 1.07 * this.state.totalCost;
    this.renderTable();
    this.forceUpdate();
  }

  renderTable() {
      return this.state.order.map((ord, index) => {
         return (
            <tr key={ord.id}>
               <td>{ord.id}</td>
               <td>{ord.food}</td>
               <td>{ord.cost}</td>
               <td>{ord.amt}</td>
               <td>
                 <Button onClick={this.handleDelete.bind(this, ord)}>
                   Delete
                 </Button>
               </td>
            </tr>
         )
      })
   }


   placeOrder = (event) => {
     if (this.props.card == "" || this.props.address == ""){
       alert("Fill up address and card details please");
       return;
     } else if (this.state.order.length == 0){
       alert("There is nothing in your order");
       return;
     }
     console.log(this.props);
     API.post("/post/placeOrder", {
       paytype: this.state.selectedOption,
       card: this.props.card,
       cost: this.state.totalCostDel,
       address: this.props.address,
     }).then((res) =>{
       console.log(res.data[0].oid);
       this.setState({ oidFromServer: res.data[0].oid})
       API.post("/post/placePlaces", {
          custId: this.props.id,
          orderId: this.state.oidFromServer,
        }).then((res) =>{
          console.log(res.data[0]);
          for(let a = 0; a < this.state.order.length; a++){
            API.post("/post/placeList", {
              oid: this.state.oidFromServer,
              iid: this.state.order[a].fid,
              quantity: this.state.order[a].amt,
            }).then((res) => {
              console.log(res.data[0]);
              API.put("/put/removeStock",{
                quan: res.data[0].quantity,
                iid: res.data[0].iid
              }).then((res)=> {
                this.state.totalCost = 0;
                this.state.totalCostDel = 0;
                this.state.order = [];
                this.forceUpdate();
              })
            })
          }
        })
     })
   }


  handlefind = (event) => {
    API.get(`http://localhost:5000/api/get/foodName`
      , {
        params: { rname: this.state.selectedRestaurant },
      })
      .then((res) => {
        return res.data
    }).then(data => {
      let resFromApi2 = data.map(food => {
        return { value: food.item, display: food.item, iid: food.iid, quan: food.quantity, cost: food.price};
      });
      console.log(resFromApi2);
      this.setState({
        food: [
          {
            value: "",
            display:
              "(Select a food)",
            id: "",
            quantity: "",
            cost: ""
          }
        ].concat(resFromApi2)
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
        <div>
        <label>
          Select a Restaurant:
          <select value={this.state.selectedRestaurant}
              onChange={(e) => this.setState({selectedRestaurant: e.target.value})}>
        {this.state.restaurant.map((restaurant) => <option key={restaurant.value} value={restaurant.value}>{restaurant.display}</option>)}
        </select>
        </label>
        <Button
          variant="primary"
          style={{ margin: "10px"}}
          onClick={this.handlefind}
        >
          Find
        </Button>
        <label>
          Select a Food:
          <select value={this.state.selectedFood}
              onChange={(e) => this.setState({selectedFood: e.target.value})}>
              {this.state.food.map((food) => <option key={food.value} value={food.value}>{food.display}</option>)}
        </select>
        </label>
        <Form>
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="Amount to Buy"
              onChange={this.handleAmtChange}
            />
          </Col>
          </Form.Row>
        </Form>
        <Button
          variant="primary"
          style={{ marginRight: "10px" }}
          onClick={this.handleTempOrder}
          >
          Add
        </Button>
      <h3> View current order </h3>
      <Table id="students">
        <tbody>
          <tr>
            <th>iid</th>
            <th>Food</th>
            <th>Cost</th>
            <th>quantity</th>
            <th>Delete</th>
          </tr>
          {this.renderTable()}
        </tbody>
      </Table>
      <h3> Pay by </h3>
      <label>
        <input type="radio" value="card"
                      checked={this.state.selectedOption === 'card'}
                      onChange={this.handleOptionChange} />
        card
      </label>
      <br></br>
      <label>
        <input type="radio" value="cash"
                      checked={this.state.selectedOption === 'cash'}
                      onChange={this.handleOptionChange} />
        cash
      </label>
      <br></br>
      <Button
        variant="primary"
        style={{ margin: "10px" }}
        onClick={this.placeOrder}
        >
        Place Order
      </Button>
      <h4> Total Cost Without Delivery Fee: ${this.state.totalCost}</h4>
      <h4> Total Cost With Delivery Fee: ${this.state.totalCostDel}</h4>
    </div>
    );
  }
}

export default MenuView;
