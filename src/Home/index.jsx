import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { fetchTags, setCurrTab } from "../actions/";
import { getCurrTab, getTags } from "../reducers/";
import Heading from "../Heading/";
import Articles from "../Articles/";
import HomeTabs from "./HomeTabs";
import HomeTags from "./HomeTags";
import {
  MainContainer,
  TwoColumnsContainer,
  LeftColumn,
  RightColumn
} from "../common/containers";

class Home extends Component {
  constructor(props) {
    super(props);
    this.setTab();
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { dispatch } = this.props;
    dispatch(fetchTags());
  }
  setTab() {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setCurrTab({ type: "feed", user: user.username }));
    } else {
      dispatch(setCurrTab({ type: "global" }));
    }
  }
  render() {
    const { currTab, tags, onTagClick } = this.props;
    return (
      <Fragment>
        <Heading />
        <MainContainer>
          <TwoColumnsContainer>
            <LeftColumn>
              <HomeTabs currTab={currTab} />
              <Articles />
            </LeftColumn>
            <RightColumn>
              <HomeTags tags={tags} onTagClick={onTagClick} />
            </RightColumn>
          </TwoColumnsContainer>
        </MainContainer>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    currTab: getCurrTab(state),
    tags: getTags(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onTagClick: tag => {
      dispatch(setCurrTab({ type: "tag", tag }));
    }
  };
};
Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
