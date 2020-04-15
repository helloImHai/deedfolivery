import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Form,
  ToggleButtonGroup,
  ToggleButton,
  Dropdown
} from "react-bootstrap";
import API from "../api";
import {
  updateUsername,
  updatePassword,
  updateUserType
} from "../actions/userActions";




class MenuView extends Component {

  constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  state = {
      restaurant: [],
      selectedRestaurant: ""
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


  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.selectedRestaurant);
    console.log(`wtf:`, this.state.selectedRestaurant);
    event.preventDefault();
  }

  render() {
    return (
        <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          Select a Restaurant:
          <select value={this.state.selectedRestaurant}
              onChange={(e) => this.setState({selectedRestaurant: e.target.value})}>
        {this.state.restaurant.map((restaurant) => <option key={restaurant.value} value={restaurant.value}>{restaurant.display}</option>)}
        </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    );
  }
}

export default MenuView;
