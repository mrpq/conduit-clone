import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import styled, { css } from "styled-components";
import { DateTime } from "luxon";

import BannerButtons from "./BannerButtons";
import { MainContainer } from "../common/containers";
import { withAuth } from "../RenderWithAuthHOC";
import { followProfile, deleteArticle } from "../actions/";
import {
  getCurrProfile,
  getIsAuthenticated,
  getIsCurrProfileFetching
} from "../reducers/index";

const BannerContainer = styled.div`
  padding: 32px 0 32px 0;
  color: #fff;
  background-color: #333;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 44px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const MetaContainer = styled.div`
  display: flex;
  margin-bottom: 32px;
`;
export const Avatar = styled.div`
  width: 34px;
  height: 34px;
  background: ${({ image }) =>
    image
      ? `url("${image}")`
      : `url("https://static.productionready.io/images/smiley-cyrus.jpg")`};
  background-size: contain;
  border-radius: 50%;
`;

const Meta = styled.div`
  margin-left: 5px;
`;

const Author = styled.a`
  color: #fff;
  line-height: 1em;
  text-decoration: none;
`;

const PublishDate = styled.div`
  font-size: 0.75rem;
  line-height: 1em;
  color: #b2b2b2;
`;

let Banner = ({
  article,
  onEditClick,
  currProfile,
  isCurrProfileFetching,
  onFollowClick,
  onFavouriteClick,
  onDeleteClick
}) => {
  const {
    slug,
    title,
    author: { image, username },
    createdAt,
    favoritesCount,
    favorited
  } = article;
  return (
    <BannerContainer>
      <MainContainer>
        <Title>{title}</Title>
        <MetaContainer>
          <Avatar image={image} />
          <Meta>
            <Author>{username}</Author>
            <PublishDate>
              {DateTime.fromISO(createdAt).toLocaleString()}
            </PublishDate>
          </Meta>
          <BannerButtons
            currProfile={currProfile}
            onEditClick={onEditClick}
            onFollowClick={onFollowClick}
            onDeleteClick={onDeleteClick}
            article={article}
          />
        </MetaContainer>
      </MainContainer>
    </BannerContainer>
  );
};

const mapStateToProps = state => {
  return {
    currProfile: getCurrProfile(state),
    isCurrProfileFetching: getIsCurrProfileFetching(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFollowClick: (username, follow) => () => {
      dispatch(followProfile(username, follow));
    },
    onEditClick: slug => () => {
      dispatch(push(`/editor/${slug}`));
    },
    onDeleteClick: slug => () => {
      dispatch(deleteArticle(slug));
    }
  };
};

Banner = connect(mapStateToProps, mapDispatchToProps)(Banner);

export default Banner;
