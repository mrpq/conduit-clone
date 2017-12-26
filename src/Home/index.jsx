import React, { Component, Fragment } from "react";
import { fetchTags, setCurrTab } from "../actions/";
import { connect } from "react-redux";
import Heading from "../Heading/";
import Articles from "../Articles/";
import Tags from "../Tags/";
import HomeTabs from "./HomeTabs";
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
    return (
      <Fragment>
        <Heading />
        <UniversalContainer>
          <TwoColumnsContainer>
            <LeftColumn>
              <HomeTabs />
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

Home = connect()(Home);

export default Home;
