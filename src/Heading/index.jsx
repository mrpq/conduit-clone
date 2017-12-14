import React, { Component, Fragment } from "react";
import UniversalContainer from "../Layout/UniversalContainer";
import NavBar from "./NavBar";
import Banner from "./Banner";

class Heading extends Component {
  render() {
    return (
      <Fragment>
        <UniversalContainer>
          <NavBar />
        </UniversalContainer>
        <Banner />
      </Fragment>
    );
  }
}

export default Heading;
