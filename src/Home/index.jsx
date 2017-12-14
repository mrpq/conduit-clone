import React, { Component, Fragment } from "react";
import { fetchUser } from "../actions/";
import { connect } from "react-redux";
import Heading from "../Heading/";
import Articles from "../Articles/";
import { TabsContainer, Tab } from "../Tabs/";
import { getCurrTab, getUsername } from "../reducers/";
import renderWithAuth from "../RenderWithAuthHOC";
import {
  TwoColumnsContainer,
  LeftColumn,
  RightColumn,
  UniversalContainer
} from "../Layout/";

class Home extends Component {
  componentDidMount() {
    this.fetchData();
  }
  componentWillUpdate() {
    this.fetchData();
  }
  fetchData() {
    const { dispatch } = this.props;
    return dispatch(fetchUser());
  }
  render() {
    const { user, currTab } = this.props;
    const PrivateTab = renderWithAuth(Tab);
    return (
      <Fragment>
        <Heading />
        <UniversalContainer>
          <TabsContainer>
            <PrivateTab
              type="feed"
              user={user}
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
          <TwoColumnsContainer>
            <LeftColumn>
              <Articles />
            </LeftColumn>
            <RightColumn>Sidebar</RightColumn>
          </TwoColumnsContainer>
        </UniversalContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: getUsername(state),
    currTab: getCurrTab(state)
  };
};

Home = connect(mapStateToProps)(Home);

export default Home;
