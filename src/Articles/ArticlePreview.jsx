import React, { Component } from "react";
import styled from "styled-components";

import { DateTime } from "luxon";

const Article = styled.article`
  padding-top: 24px;
  padding-bottom: 24px;
  border-top: 1px solid #b2b2b2;
  &:first-of-type {
    border: none;
  }
`;
const Header = styled.header`
  display: flex;
`;
const Avatar = styled.div`
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
  color: #4fb862;
  line-height: 1em;
  text-decoration: none;
`;
const PublishDate = styled.div`
  font-size: 0.75rem;
  color: #b2b2b2;
`;
const LikesWrapper = styled.div`
  flex-grow: 1;
  text-align: right;
`;
const Likes = styled.div`
  display: inline-block;
  padding: 3px 5px;
  border: 1px solid #4fb862;
  border-radius: 3px;
  font-size: 0.75em;
  color: #4fb862;
`;
const Title = styled.h2``;
const Preview = styled.p``;
const Link = styled.a`
  color: #b2b2b2;
  text-decoration: none;
  font-size: 0.75em;
`;

const ArticlePreview = ({ article, onArticleClick, onAuthorClick }) => {
  const {
    author,
    slug,
    tagList,
    createdAt,
    title,
    favourited,
    favoritesCount,
    body,
    description
  } = article;
  return (
    <Article>
      <Header>
        <Avatar image={author.image} />
        <Meta>
          <Author
            href={`${author.username}`}
            onClick={e => {
              e.preventDefault();
              onAuthorClick(author.username);
            }}
          >
            {author.username}
          </Author>
          <PublishDate>
            {DateTime.fromISO(createdAt).toLocaleString()}
          </PublishDate>
        </Meta>
        <LikesWrapper>
          <Likes>&hearts;{`${favoritesCount}`}</Likes>
        </LikesWrapper>
      </Header>
      <Title>{title}</Title>
      <Preview>
        {description ||
          body
            .split(" ")
            .slice(0, 10)
            .join(" ")}
      </Preview>
      <Link
        href={`/article/${slug}`}
        onClick={e => {
          e.preventDefault();
          onArticleClick(slug);
        }}
      >
        Read more...
      </Link>
    </Article>
  );
};

export default ArticlePreview;
