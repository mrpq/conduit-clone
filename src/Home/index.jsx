import React, { Component, Fragment } from "react";
import { fetchUser } from "../actions";
import { connect } from "react-redux";
import Heading from "../Heading/";
import Articles from "../Articles/";
import { TabsContainer, Tab } from "../Tabs/";
import { getUsername } from "../reducers";
import { getCurrTab } from "../reducers/currTab";
import renderWithAuth from "../RenderWithAuthHOC";
import { setCurrTab } from "../actions";
import Feed from "../Articles/Feed";

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
        {/* <Feed /> */}
        <Articles />
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
