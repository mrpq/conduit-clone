import React, { Component, Fragment } from "react";
import { fetchUser, fetchTags, setCurrTab } from "../actions/";
import { connect } from "react-redux";
import Heading from "../Heading/";
import Articles from "../Articles/";
import Tags from "../Tags/";
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
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.setActiveTab();
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { dispatch } = this.props;
    dispatch(fetchTags());
    dispatch(fetchUser());
  }
  setActiveTab() {
    const { dispatch, username } = this.props;
    username && dispatch(setCurrTab({ type: "feed", user: username }));
  }
  render() {
    const { username, currTab } = this.props;
    const PrivateTab = renderWithAuth(Tab);
    return (
      <Fragment>
        <Heading />
        <UniversalContainer>
          <TwoColumnsContainer>
            <LeftColumn>
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
              <Articles />
            </LeftColumn>
            <RightColumn>
              <Tags />
            </RightColumn>
          </TwoColumnsContainer>
        </UniversalContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const mapping = {
    currTab: getCurrTab(state)
  };
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) mapping.username = user.username;
  return mapping;
};

Home = connect(mapStateToProps)(Home);

export default Home;
