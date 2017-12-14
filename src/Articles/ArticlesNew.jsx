import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";

import { GlobalTab, Tab_ } from "./FeedTabs";

const Tab = props => {
  const { id, name, isActive, onTabClick } = props;
  const Item = styled.li`
    padding: 10px 15px;
  `;
  return <Item>{props.children}</Item>;
};

const FeedTabs = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  list-style-type: none;
`;

class ArticlesNew extends Component {
  render() {
    const { user, tag } = this.props;
    return (
      <FeedTabs>
        {/* <GlobalTab>Global Feed</GlobalTab>
        <YourFeedTab>Your Feed</YourFeedTab>
         */}
        <Tab_ type="global">Global Feed</Tab_>
        <Tab_ type="feed" user={user}>
          Your Feed
        </Tab_>
        {tag ? <Tab_ type="tag" tag={tag}>{`#${tag}`}</Tab_> : null}
      </FeedTabs>
    );
  }
}

export default ArticlesNew;
