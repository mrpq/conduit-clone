import React, { Component } from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { getIsUserUpdated } from "../reducers/";
import { logoutUser, setCurrTab } from "../actions/";
import { withAuth } from "../RenderWithAuthHOC";

const NavBarItem = props => {
  const ListItem = styled.li`
    padding: 10px 15px;
  `;
  const Link = styled.a`
    text-decoration: none;
    color: #b2b2b2;
  `;
  const { children, to, dispatch, action } = props;
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

const PrivateNavBarItem = withAuth(NavBarItem, { authRequired: true });
const PublicNavBarItem = withAuth(NavBarItem, { authRequired: false });

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
    const { isUserUpdated } = nextProps;
    return isUserUpdated;
  }

  render() {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user && user.username;
    return (
      <NavBarContainer>
        <NavBarItem to="/" dispatch={dispatch}>
          Home
        </NavBarItem>
        <PrivateNavBarItem to="/editor">New Article</PrivateNavBarItem>
        <PrivateNavBarItem to="/settings">Settings</PrivateNavBarItem>
        <PrivateNavBarItem to={`/@${username}`}>{username}</PrivateNavBarItem>
        <PublicNavBarItem to="/login">Sign in</PublicNavBarItem>
        <PublicNavBarItem to="/register">Sigh up</PublicNavBarItem>
        <PrivateNavBarItem
          to="/"
          dispatch={dispatch}
          action={() => {
            dispatch(setCurrTab({ type: "global" }));
            dispatch(logoutUser());
          }}
        >
          Logout
        </PrivateNavBarItem>
      </NavBarContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isUserUpdated: getIsUserUpdated(state)
  };
};

NavBar = connect(mapStateToProps)(NavBar);

export default NavBar;
