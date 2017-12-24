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
import { getCurrTab } from "../reducers/currTab";

class Profile extends Component {
  componentDidMount() {
    const { dispatch, match: { params: { username } } } = this.props;
    dispatch(setCurrTab({ type: "user", user: username }));
    this.fetchData(dispatch, username);
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (this.props.user !== nextProps.match.params.username) {
      dispatch(
        setCurrTab({ type: "user", user: nextProps.match.params.username })
      );
      this.fetchData(dispatch, nextProps.match.params.username);
    }
  }
  fetchData(dispatch, username) {
    return dispatch(fetchProfile(username));
  }
  renderArticles() {
    const { profile, currTab } = this.props;
    if (isEmpty(profile)) return null;
    return (
      <UniversalContainer>
        <TabsContainer>
          <Tab type="user" isActive={currTab.type === "user"}>
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
    currTab: getCurrTab(state),
    user: ownProps.match.params.username
  };
};

Profile = connect(mapStateToProps)(Profile);

export default Profile;
