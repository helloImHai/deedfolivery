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
       <header className="top-navbar">
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href="index.html">
					<img src="images/logo.png" alt="" />
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
				  <span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbars-rs-food">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item"><a className="nav-link" href="/">Home</a></li>
						<li className="nav-item active"><a className="nav-link" href="">Menu</a></li>
						<li className="nav-item"><a className="nav-link" href="">About</a></li>
						<li className="nav-item"><a className="nav-link" href="">Contact</a></li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
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
