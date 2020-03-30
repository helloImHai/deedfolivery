import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class Logout extends Component {
  handleLogout = () => {
    // TODO REFRESH ALL STATES
    this.props.history.push(`/`);
  };
  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleLogout}>
          Logout
        </Button>
      </div>
    );
  }
}
