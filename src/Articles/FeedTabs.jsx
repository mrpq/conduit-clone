import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { setCurrTab } from "../actions";

const Tab = props => {
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

class Tab_ extends Component {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick() {
    const { dispatch, type = global, user = {}, tag = "" } = this.props;
    dispatch(setCurrTab({ type, user, tag }));
  }

  render() {
    return <Tab onTabClick={this.handleTabClick}>{this.props.children}</Tab>;
  }
}

// class GlobalTab extends Component {
//   constructor(props) {
//     super(props);
//     this.handleTabClick = this.handleTabClick.bind(this);
//   }

//   handleTabClick() {
//     const { dispatch } = this.props;
//     dispatch(setCurrTab({ type: "global" }));
//   }

//   render() {
//     return <Tab onTabClick={this.handleTabClick}>{this.props.children}</Tab>;
//   }
// }

// class YourFeedTab extends Component {
//   constructor(props) {
//     super(props);
//     this.handleTabClick = this.handleTabClick.bind(this);
//   }
//   handleTabClick() {
//     const { dispatch, user } = this.props;
//     dispatch(setCurrTab({ type: "feed", user }));
//   }
//   render() {
//     return <Tab onTabClick={this.handleTabClick}>{this.props.children}</Tab>;
//   }
// }

// class TagTab extends Component {
//   constructor(props) {
//     super(props);
//     this.handleTabClick = this.handleTabClick.bind(this);
//   }
//   handleTabClick() {
//     const { dispatch, tag } = this.props;
//     dispatch(setCurrTab({ type: "tag", tag }));
//   }
//   render() {
//     return <Tab onTabClick={this.handleTabClick}>{this.props.children}</Tab>;
//   }
// }

// GlobalTab = connect()(GlobalTab);
// export { GlobalTab };

Tab_ = connect()(Tab_);
export { Tab_ };
