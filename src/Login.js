import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { push } from "react-router-redux";

import { loginUser } from "./actions";
import { getIsAuthenticated } from "./reducers";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "piiiiq@gmail.com", password: "123123123" };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    console.log("puk!");
    dispatch(
      loginUser({ email: this.state.email, password: this.state.password })
    ).then(() => {
      dispatch(push("/"));
    });
  };

  render() {
    const { onLoginSubmit, isAuthenticated, dispatch } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="App">
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    );
  }
}
// Login.propTypes = {
//   onLoginSubmit: PropTypes.func
// };

const mapStateToProps = (state, ownProps) => {
  return { isAuthenticated: getIsAuthenticated(state) };
};

Login = connect(mapStateToProps)(Login);

export default Login;
