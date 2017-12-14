import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { setCurrTab } from "../actions";

const Tab_ = props => {
  const { id, isActive, onTabClick } = props;
  const Item = styled.li`
    padding: 10px 15px;
  `;
  const Button = styled.button``;
  return (
    <Item>
      <Button onClick={onTabClick}>{props.children}</Button>
    </Item>
  );
};

class Tab extends Component {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick() {
    const { dispatch, type = "global", user = {}, tag = "" } = this.props;
    dispatch(setCurrTab({ type, user, tag }));
  }

  render() {
    return <Tab_ onTabClick={this.handleTabClick}>{this.props.children}</Tab_>;
  }
}
Tab = connect()(Tab);
export default Tab;
