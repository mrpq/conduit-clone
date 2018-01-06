import React from "react";
import styled from "styled-components";
import { DateTime } from "luxon";

import Likes from "./Likes";
import Tags from "../Tags/";

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
  margin-bottom: 16px;
`;
const Avatar = styled.div`
  width: 34px;
  height: 34px;
  background: ${({ image }) =>
    image
      ? `url("${image}")`
      : `url("https://static.productionready.io/images/smiley-cyrus.jpg")`};
  background-size: contain;
  background-repeat: no-repeat;
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
const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 3px;
`;
const Preview = styled.p`
  margin-top: 0;
  margin-bottom: 16px;
`;
const Link = styled.a`
  color: #b2b2b2;
  text-decoration: none;
  font-size: 0.75em;
`;
const Footer = styled.footer`
  display: flex;
`;
const TagsContainer = styled.div`
  margin-left: auto;
`;

const ArticlePreview = ({
  article,
  onArticleClick,
  onAuthorClick,
  onTagClick
}) => {
  const {
    author,
    slug,
    tagList,
    createdAt,
    title,
    favorited,
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
        <Likes
          slug={slug}
          favorited={favorited}
          favoritesCount={favoritesCount}
        />
      </Header>
      <Title>{title}</Title>
      <Preview>
        {description ||
          body
            .split(" ")
            .slice(0, 10)
            .join(" ")}
      </Preview>
      <Footer>
        <Link
          href={`/article/${slug}`}
          onClick={e => {
            e.preventDefault();
            onArticleClick(slug);
          }}
        >
          Read more...
        </Link>
        <TagsContainer>
          <Tags tags={tagList} onTagClick={onTagClick(slug)} />
        </TagsContainer>
      </Footer>
    </Article>
  );
};

export default ArticlePreview;
