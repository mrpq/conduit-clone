import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { toggleLike } from "../actions/";
import {
  getIsAuthenticated,
  getIsToggleLikeRequestPending
} from "../reducers/index";

const LikesWrapper = styled.div`
  flex-grow: 1;
  text-align: right;
`;
const LikesButton = styled.button`
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid #4fb862;
  border-radius: 3px;
  font-size: 14px;
  line-height: 1.25;
  color: ${props => (props.favorited ? "#fff" : "#4fb862")};
  background-color: ${props => (props.favorited ? "#4fb862" : "#fff")};
  &:hover {
    color: #fff;
    background-color: ${props => (props.favorited ? "#449d44" : "#4fb862")};
  }
  cursor: ${props => (props.disabled ? "wait" : "pointer")};
`;

class Likes extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { isAuthenticated, dispatch, slug, favorited } = this.props;
    console.log(favorited);
    if (!isAuthenticated) dispatch(push("/login"));
    dispatch(toggleLike(slug, favorited));
  }

  render() {
    const {
      favoritesCount,
      favorited,
      isToggleLikeRequestPending
    } = this.props;
    return (
      <LikesWrapper>
        <LikesButton
          favorited={favorited}
          onClick={this.handleClick}
          disabled={isToggleLikeRequestPending}
        >
          &hearts;{favoritesCount}
        </LikesButton>
      </LikesWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: getIsAuthenticated(state),
    isToggleLikeRequestPending: getIsToggleLikeRequestPending(state)
  };
};
Likes = connect(mapStateToProps)(Likes);

export default Likes;
