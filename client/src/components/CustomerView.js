import React, { Component } from "react";
import { connect } from "react-redux";

export class CustomerView extends Component {
  render() {
    return <User username={this.props.username}></User>;
  }
}

class User extends PureComponent {
  render() {
    return (
      <ul>
        <li>Username {this.props.username}</li>
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  password: state.user.password,
  userType: state.user.userType
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerView);
