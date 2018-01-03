import React, { Component, Fragment } from "react";
import { MainContainer } from "../common/containers";
import NavBar from "./NavBar";
import Banner from "./Banner";

class Heading extends Component {
  render() {
    return (
      <Fragment>
        <MainContainer>
          <NavBar />
        </MainContainer>
        <Banner />
      </Fragment>
    );
  }
}

export default Heading;
