import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import styled from "styled-components";

import Heading from "../Heading/";
import { MainContainer, CenteringContainer } from "../common/containers";
import { LargeInput, SubmitButton } from "../common/inputs";
import Errors from "../Errors/";

import { clearAuthErrors, registerUser } from "../actions/";
import { getIsAuthenticated, getAuthErrors } from "../reducers/";

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
    this.state = { email: "", password: "", username: "" };
  }
  componentDidMount() {
    this.checkAndRedirect();
    this.clearErrors();
  }
  componentDidUpdate() {
    this.checkAndRedirect();
  }

  checkAndRedirect() {
    const { dispatch, isAuthenticated } = this.props;
    isAuthenticated && dispatch(push("/"));
  }
  clearErrors() {
    const { dispatch } = this.props;
    dispatch(clearAuthErrors());
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    dispatch(registerUser({ ...this.state }));
  };

  render() {
    const { errors } = this.props;
    return (
      <Fragment>
        <Heading withBanner={false} />
        <MainContainer>
          <CenteringContainer>
            <H1>Sign up</H1>
            {errors ? <Errors errors={errors} /> : null}
            <div>
              <LargeInput
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="Username"
              />
              <LargeInput
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email"
              />
              <LargeInput
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Password"
              />
              <div style={{ textAlign: "right" }}>
                <SubmitButton onClick={this.handleSubmit}>Sign in</SubmitButton>
              </div>
            </div>
          </CenteringContainer>
        </MainContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: getIsAuthenticated(state),
    errors: getAuthErrors(state)
  };
};

Login = connect(mapStateToProps)(Login);

export default Login;
