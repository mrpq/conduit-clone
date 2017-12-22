import React, { Component } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";

import { setCurrTab } from "../actions/";

const FeedButton = styled.button`
  background: none;
  border: none;
  padding: 10px 15px;
  ${props =>
    props.isActive &&
    css`
      color: #4fb862;
      border-bottom: 2px solid #4fb862;
    `};
`;

class Tab extends Component {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick() {
    const { dispatch, type = "global", user = "", tag = "" } = this.props;
    dispatch(setCurrTab({ type, user, tag }));
  }

  render() {
    const { children, isActive } = this.props;
    return (
      <li>
        <FeedButton
          onClick={this.handleTabClick}
          isActive={isActive}
          disabled={isActive}
        >
          {this.props.children}
        </FeedButton>
      </li>
    );
  }
}
Tab = connect()(Tab);
export default Tab;
