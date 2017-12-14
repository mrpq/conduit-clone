import React, { Component } from "react";

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

export default renderWithAuth;
