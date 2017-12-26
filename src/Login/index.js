import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import styled from "styled-components";

import Heading from "../Heading/";
import { UniversalContainer } from "../Layout/";
import { LargeInput, SubmitButton } from "../Editor/";

import { loginUser } from "../actions/";
import { getIsAuthenticated } from "../reducers/";

const H1 = styled.h1`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 40px;
  line-height: 44px;
  text-align: center;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "piiiiq@gmail.com", password: "123123123" };
  }
  componentDidMount() {
    this.checkAndRedirect();
  }

  componentDidUpdate() {
    this.checkAndRedirect();
  }

  checkAndRedirect() {
    const { dispatch, isAuthenticated } = this.props;
    isAuthenticated && dispatch(push("/"));
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    dispatch(
      loginUser({ email: this.state.email, password: this.state.password })
    );
  };

  render() {
    return (
      <Fragment>
        <Heading />
        <UniversalContainer>
          <H1>Sign in</H1>
          <div className="App">
            <LargeInput
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <LargeInput
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div style={{ textAlign: "right" }}>
              <SubmitButton onClick={this.handleSubmit}>Sign in</SubmitButton>
            </div>
          </div>
        </UniversalContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { isAuthenticated: getIsAuthenticated(state) };
};

Login = connect(mapStateToProps)(Login);

export default Login;
