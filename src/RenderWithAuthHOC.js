import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { getIsAuthenticated } from "./reducers/index";

const renderWithAuth = (Wrapped, authRequired = true) => {
  return class PublicOnlyWrapper extends Component {
    render() {
      const isAuthenticated = !!localStorage.getItem("jwt_token");
      return isAuthenticated === authRequired ? (
        <Wrapped {...this.props} />
      ) : null;
    }
  };
};

export const withAuth = (Wrapped, { authRequired = true, redirectTo }) => {
  class Wrapper extends Component {
    componentDidMount() {
      if (redirectTo) this.checkAndRedirect();
    }

    componentDidUpdate() {
      if (redirectTo) this.checkAndRedirect();
    }

    checkAndRedirect() {
      const { isAuthenticated, dispatch } = this.props;
      if (!isAuthenticated) dispatch(push(redirectTo));
    }

    render() {
      const { isAuthenticated } = this.props;
      if (authRequired === isAuthenticated) {
        return <Wrapped {...this.props} />;
      } else {
        return null;
      }
    }
  }
  const mapStateToProps = state => {
    return {
      isAuthenticated: getIsAuthenticated(state)
    };
  };
  Wrapper = connect(mapStateToProps)(Wrapper);
  return Wrapper;
};

export default renderWithAuth;
