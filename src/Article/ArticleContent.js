import React from "react";
import styled, { css } from "styled-components";

import Tags from "../Tags/";

const ArticleContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 20px;
  padding-bottom: 32px;
  border-bottom: 1px solid #ccc;
`;

const ArticteBody = styled.div`
  font-size: 20px;
  margin-bottom: 32px;
`;

const customTagsStyles = css`
  border: 1px solid #ddd;
  color: #aaa;
  background: none;
  cursor: initial;
`;

const ArticleContent = ({ article: { body, tagList } }) => {
  return (
    <ArticleContainer>
      <ArticteBody>{body}</ArticteBody>
      <div>
        <Tags tags={tagList} customStyles={customTagsStyles} />
      </div>
    </ArticleContainer>
  );
};

export default ArticleContent;
