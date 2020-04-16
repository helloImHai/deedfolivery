import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { resetState } from "../actions/userActions";
import { connect } from "react-redux";

class Logout extends Component {
  handleLogout = () => {
    this.props.resetState();
    this.props.history.push(`/`);
  };
  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleLogout}>
          Logout
        </Button>
        <br></br>
        <br></br>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    resetState: () => {
      dispatch(resetState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
