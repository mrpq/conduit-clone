import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";

import Heading from "../Heading/";
import Articles from "../Articles";
import UserInfo from "./UserInfo";
import { TabsContainer, Tab } from "../Tabs/";
import { MainContainer } from "../common/containers";
import { fetchProfile, setCurrTab } from "../actions/";
import { getCurrProfile } from "../reducers/";
import { getCurrTab } from "../reducers/";

class Profile extends Component {
  constructor(props) {
    super(props);
    const { dispatch, match: { params: { username } } } = this.props;
    dispatch(setCurrTab({ type: "user", user: username }));
  }

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    const { dispatch, match: { params: { username } } } = this.props;
    const { match: { params: { username: prevUsername } } } = prevProps;
    if (username !== prevUsername) {
      dispatch(setCurrTab({ type: "user", user: username }));
      this.fetchData();
    }
  }
  fetchData() {
    const { dispatch, match: { params: { username } } } = this.props;
    return dispatch(fetchProfile(username));
  }
  renderArticles() {
    const { profile, currTab } = this.props;
    if (isEmpty(profile)) return null;
    return (
      <MainContainer>
        <TabsContainer>
          <Tab
            type="user"
            isActive={currTab.type === "user"}
            user={profile.username}
          >
            My Articles
          </Tab>
        </TabsContainer>
        <Articles />
      </MainContainer>
    );
  }
  render() {
    const { profile } = this.props;
    return (
      <Fragment>
        <Heading withBanner={false} />
        <UserInfo profile={profile} />
        {this.renderArticles()}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: getCurrProfile(state),
    currTab: getCurrTab(state)
  };
};

Profile = connect(mapStateToProps)(Profile);

export default Profile;
