import React, { Component } from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { getUsername, getIsUpdated } from "../reducers/";
import { logoutUser } from "../actions/";
import renderWithAuth from "../RenderWithAuthHOC";

const NavBarItem = props => {
  const { children, to, dispatch, action } = props;
  const ListItem = styled.li`
    padding: 10px 15px;
  `;
  const Link = styled.a`
    text-decoration: none;
    color: #b2b2b2;
  `;
  return (
    <ListItem>
      <Link
        href={to}
        onClick={e => {
          e.preventDefault();
          action && action();
          dispatch(push(to));
        }}
      >
        {children}
      </Link>
    </ListItem>
  );
};

const PrivateNavBarItem = renderWithAuth(NavBarItem);
const PublicNavBarItem = renderWithAuth(NavBarItem, false);

const NavBarContainer = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  list-style-type: none;
  justify-content: flex-end;
`;

class NavBar extends Component {
  shouldComponentUpdate(nextProps) {
    const { isUpdated } = nextProps;
    return isUpdated;
  }
  componentDidUpdate() {}
  render() {
    const { username, dispatch } = this.props;
    return (
      <NavBarContainer>
        <NavBarItem to="/" dispatch={dispatch}>
          Home
        </NavBarItem>
        <PrivateNavBarItem to="/editor" dispatch={dispatch}>
          New Article
        </PrivateNavBarItem>
        <PrivateNavBarItem to="/settings" dispatch={dispatch}>
          Settings
        </PrivateNavBarItem>
        <PrivateNavBarItem to={`/@${username}`} dispatch={dispatch}>
          {username}
        </PrivateNavBarItem>
        <PublicNavBarItem to="/login" dispatch={dispatch}>
          Login
        </PublicNavBarItem>
        <PrivateNavBarItem
          to="/"
          dispatch={dispatch}
          action={() => dispatch(logoutUser())}
        >
          Logout
        </PrivateNavBarItem>
      </NavBarContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const mapping = {
    isUpdated: getIsUpdated(state)
  };
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) mapping.username = user.username;
  return mapping;
};

NavBar = connect(mapStateToProps)(NavBar);

export default NavBar;
