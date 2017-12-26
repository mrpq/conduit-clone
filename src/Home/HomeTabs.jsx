import React, { Component } from "react";
import { connect } from "react-redux";

import { TabsContainer, Tab } from "../Tabs/";
import { getCurrTab } from "../reducers/";
import { withAuth } from "../RenderWithAuthHOC";

class HomeTabs extends Component {
  render() {
    const { currTab } = this.props;
    const PrivateTab = withAuth(Tab, { authRequired: true });
    return (
      <TabsContainer>
        <PrivateTab
          type="feed"
          user={currTab.user}
          isActive={currTab.type === "feed"}
        >
          Your Feed
        </PrivateTab>
        <Tab type="global" isActive={currTab.type === "global"}>
          Global Feed
        </Tab>
        {currTab.tag ? (
          <Tab type="tag" isActive={currTab.type === "tag"}>{`#${
            currTab.tag
          }`}</Tab>
        ) : null}
      </TabsContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    currTab: getCurrTab(state)
  };
};
HomeTabs = connect(mapStateToProps)(HomeTabs);

export default HomeTabs;
