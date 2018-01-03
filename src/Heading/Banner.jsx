import React, { Component } from "react";
import styled from "styled-components";

import { withAuth } from "../RenderWithAuthHOC";

const BannerContainer = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
  text-align: center;
  color: #fff;
  background-color: #4fb862;
`;
const BannerHeader = styled.h1`
  font-size: 3rem;
  line-height: 1.05em;
`;
const BannerText = styled.p`
  font-size: 1.25rem;
`;

class Banner extends Component {
  render() {
    return (
      <BannerContainer>
        <BannerHeader>conduit</BannerHeader>
        <BannerText>A place to share your knowledge</BannerText>
      </BannerContainer>
    );
  }
}

Banner = withAuth(Banner, { authRequired: false });

export default Banner;
