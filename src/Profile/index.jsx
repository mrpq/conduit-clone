import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";

import Heading from "../Heading/";
import Articles from "../Articles";
import UserInfo from "./UserInfo";
import { TabsContainer, Tab } from "../Tabs/";
import { UniversalContainer } from "../Layout/";
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
    const { dispatch, match: { params: { username } } } = this.props;

    this.fetchData(username);
  }
  componentDidUpdate(prevProps) {
    const { dispatch, match: { params: { username } } } = this.props;
    const { match: { params: { username: prevUsername } } } = prevProps;
    if (username != prevUsername) {
      dispatch(setCurrTab({ type: "user", user: username }));
      this.fetchData(username);
    }
  }
  fetchData(username) {
    const { dispatch } = this.props;
    return dispatch(fetchProfile(username));
  }
  renderArticles() {
    const { profile, currTab } = this.props;
    if (isEmpty(profile)) return null;
    return (
      <UniversalContainer>
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
      </UniversalContainer>
    );
  }
  render() {
    const { profile } = this.props;
    return (
      <Fragment>
        <Heading />
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
