import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import styled from "styled-components";

import Heading from "../Heading/";
import { MainContainer, CenteringContainer } from "../common/containers";
import { LargeInput, SubmitButton } from "../common/inputs";
import Errors from "../Errors/";

import { loginUser, clearAuthErrors } from "../actions/";
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
    this.state = { email: "piiiiq@gmail.com", password: "123123123" };
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
    dispatch(
      loginUser({ email: this.state.email, password: this.state.password })
    );
  };

  render() {
    const { errors } = this.props;
    return (
      <Fragment>
        <Heading withBanner={false} />
        <MainContainer>
          <CenteringContainer>
            <H1>Sign in</H1>
            {errors ? <Errors errors={errors} /> : null}
            <div>
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
