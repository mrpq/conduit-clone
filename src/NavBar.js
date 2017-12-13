import React, { Component } from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { getUsername, getIsAuthenticated } from "./reducers";
import { logoutUser } from "./actions";

const NavBarItem = ({ children, to, dispatch, action }) => (
  <li>
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        action && action();
        dispatch(push(to));
      }}
    >
      {children}
    </a>
  </li>
);

const PrivateNavBarItem = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? <NavBarItem {...props} /> : null;
};
const AuthNavBarItem = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? <NavBarItem {...props} /> : null;
};

class NavBar extends Component {
  render() {
    const { username, isAuthenticated, dispatch } = this.props;
    return (
      <ul>
        <NavBarItem to="/" dispatch={dispatch}>
          Home
        </NavBarItem>
        <AuthNavBarItem
          to="/editor"
          isAuthenticated={isAuthenticated}
          dispatch={dispatch}
        >
          New Article
        </AuthNavBarItem>
        <AuthNavBarItem
          to="/settings"
          isAuthenticated={isAuthenticated}
          dispatch={dispatch}
        >
          Settings
        </AuthNavBarItem>
        <AuthNavBarItem
          to={`/@${username}`}
          isAuthenticated={isAuthenticated}
          dispatch={dispatch}
        >
          {username}
        </AuthNavBarItem>
        <AuthNavBarItem
          to="/login"
          isAuthenticated={!isAuthenticated}
          dispatch={dispatch}
        >
          Login
        </AuthNavBarItem>
        <AuthNavBarItem
          to="/"
          isAuthenticated={isAuthenticated}
          dispatch={dispatch}
          action={() => {
            dispatch(logoutUser());
          }}
        >
          Logout
        </AuthNavBarItem>
      </ul>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: getUsername(state),
    isAuthenticated: getIsAuthenticated(state)
  };
};

NavBar = connect(mapStateToProps)(NavBar);

export default NavBar;
