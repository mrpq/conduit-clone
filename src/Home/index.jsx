import React, { Component, Fragment } from "react";
import { fetchUser, fetchTags, setCurrTab } from "../actions/";
import { connect } from "react-redux";
import Heading from "../Heading/";
import Articles from "../Articles/";
import Tags from "../Tags/";
import HomeTabs from "./HomeTabs";
import { getCurrTab, getUsername } from "../reducers/";
// import renderWithAuth from "../RenderWithAuthHOC";
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
  componentDidMount() {
    this.setActiveTab();
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    // this.setActiveTab();
    // this.fetchData();
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
    return (
      <Fragment>
        <Heading />
        <UniversalContainer>
          <TwoColumnsContainer>
            <LeftColumn>
              <HomeTabs {...this.props} />
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
