import React, { Component } from "react";

import { TabsContainer, Tab } from "../Tabs/";
import { withAuth } from "../RenderWithAuthHOC";

const HomeTabs = ({ currTab }) => {
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
};

export default HomeTabs;
