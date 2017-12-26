import React, { Component } from "react";
import { TabsContainer, Tab } from "../Tabs/";
import renderWithAuth from "../RenderWithAuthHOC";

class HomeTabs extends Component {
  render() {
    const { username, currTab } = this.props;
    const PrivateTab = renderWithAuth(Tab);
    return (
      <TabsContainer>
        <PrivateTab
          type="feed"
          user={username}
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

export default HomeTabs;
