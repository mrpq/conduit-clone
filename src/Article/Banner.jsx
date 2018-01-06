import React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { DateTime } from "luxon";

import { MainContainer } from "../common/containers";
import Likes from "../Articles/Likes";
import { withAuth } from "../RenderWithAuthHOC";
import { followProfile } from "../actions/";
import { getCurrProfile, getIsAuthenticated } from "../reducers/index";

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

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 32px;
  & > * + * {
    margin-left: 4px;
  }
`;

const btn = (light, dark, darker) => css`
  font-size: 14px;
  line-height: 1;
  padding: 4px 8px;
  border-radius: 3px;
  color: ${dark};
  border: 1px solid ${dark};
  background-color: transparent;
  &:hover,
  &:active {
    color: ${light};
  }
  &:hover {
    background: ${dark};
  }
  &:active {
    background: ${darker};
    border-color: ${darker};
  }
`;
const Button = styled.button`
  ${({ btnType }) => {
    switch (btnType) {
      case "edit":
      case "follow":
        return btn("#fff", "#ccc", "#a1a1a1");
      case "delete":
        return btn("#fff", "#b85c5c", "#672d2d");
      case "favorite":
        return btn("#fff", "#5cb85c", "#2d672d");
    }
  }};
`;

const FollowButton = ({ currProfile, onFollowClick }) => {
  const { username, following } = currProfile;
  return (
    <Button btnType="follow" onClick={onFollowClick(username, !following)}>{`${
      following ? "Unfollow" : "Follow"
    } ${username}`}</Button>
  );
};

const EditButton = ({onEditClick}) => {
  return (
    <Button btnType="edit" onClick={onEditClick}>Edit Article</Button>
  )
}

let Banner = ({
  article,
  onEditClick,
  currProfile,
  onFollowClick,
  onFavouriteClick
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
          <ButtonsContainer>
            <FollowButton
              currProfile={currProfile}
              onFollowClick={onFollowClick}
            />
            <Button btnType="edit">Hello</Button>
            <Button btnType="delete">Delete</Button>
            <Likes
              favoritesCount={favoritesCount}
              favorited={favorited}
              slug={slug}
            />
            {/* <Button btnType="favorite">Delete</Button> */}
          </ButtonsContainer>
        </MetaContainer>
      </MainContainer>
    </BannerContainer>
  );
};

const mapStateToProps = state => {
  return {
    currProfile: getCurrProfile(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowClick: (username, follow) => () => {
      dispatch(followProfile(username, follow));
    }
  };
};

Banner = connect(mapStateToProps, mapDispatchToProps)(Banner);

export default Banner;
