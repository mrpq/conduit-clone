import React, { Component, Fragment } from "react";

import { MainContainer } from "../common/containers";
import NavBar from "./NavBar";
import Banner from "./Banner";

const Heading = ({ withBanner = true }) => {
  return (
    <Fragment>
      <MainContainer>
        <NavBar />
      </MainContainer>
      {withBanner ? <Banner /> : null}
    </Fragment>
  );
};

export default Heading;
