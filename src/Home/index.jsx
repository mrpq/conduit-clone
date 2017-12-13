import React, { Component, Fragment } from "react";
import { fetchUser } from "../actions";
import { connect } from "react-redux";
import Heading from "../Heading/";
import Articles from "../Articles/";

class Home extends Component {
  componentDidMount() {
    console.log("Home did mount");
    this.fetchData();
  }
  componentWillUpdate() {
    console.log("Home wil update");
    this.fetchData();
  }
  fetchData() {
    const { dispatch } = this.props;
    return dispatch(fetchUser());
  }
  render() {
    return (
      <Fragment>
        <Heading />
        <Articles />
      </Fragment>
    );
  }
}
Home = connect()(Home);

export default Home;
