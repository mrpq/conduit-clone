import React, { Fragment } from "react";
import styled, { css } from "styled-components";

import Likes from "../Articles/Likes";

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

const EditButton = ({ onEditClick }) => {
  return (
    <Button btnType="edit" onClick={onEditClick}>
      Edit Article
    </Button>
  );
};

const DeleteButton = ({ onDeleteClick }) => {
  return (
    <Button btnType="delete" onClick={onDeleteClick}>
      Delete Article
    </Button>
  );
};

const OwnArticleButtons = ({ onEditClick, onDeleteClick }) => {
  return (
    <Fragment>
      <EditButton onEditClick={onEditClick} />
      <DeleteButton onDeleteClick={onDeleteClick} />
    </Fragment>
  );
};

const OthersArticleButton = ({ currProfile, onFollowClick, article }) => {
  const { slug, favoritesCount, favorited } = article;
  return (
    <Fragment>
      <FollowButton currProfile={currProfile} onFollowClick={onFollowClick} />
      <Likes
        favoritesCount={favoritesCount}
        favorited={favorited}
        slug={slug}
      />
    </Fragment>
  );
};

const BannerButtons = ({
  currProfile,
  onFollowClick,
  onEditClick,
  onDeleteClick,
  article
}) => {
  console.log(currProfile.isFetching);
  if (currProfile.isFetching) return null;
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwnArticle = user && user.username === currProfile.username;
  return (
    <ButtonsContainer>
      {isOwnArticle ? (
        <OwnArticleButtons
          onEditClick={onEditClick(article.slug)}
          onDeleteClick={onDeleteClick(article.slug)}
        />
      ) : (
        <OthersArticleButton
          currProfile={currProfile}
          onFollowClick={onFollowClick}
          article={article}
        />
      )}
    </ButtonsContainer>
  );
};

export default BannerButtons;
