import React from "react";
import { Redirect } from "react-router-dom";

export const withAuth = (Component, options = {}) => {
  return class Wrapper extends React.Component {
    isAuthenticated() {
      return localStorage.getItem("jwt_token");
    }
    render() {
      const isAuthenticated = this.isAuthenticated();
      if (!isAuthenticated && options.redirectTo) {
        return <Redirect to={options.redirectTo} />;
      }
      return <Component {...this.props} isAuthenticated={isAuthenticated} />;
    }
  };
};
