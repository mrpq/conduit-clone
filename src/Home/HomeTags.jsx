import React from "react";
import styled from "styled-components";
import Tags from "../Tags/";

const TagListContainer = styled.div`
  padding: 5px 10px;
  background-color: #eee;
  border-radius: 4px;
`;

const TagListHeader = styled.h3`
  margin: 0;
  padding: 10px 0;
  font-weight: normal;
`;

const HomeTags = props => {
  const { tags: { tags, isFetching }, onTagClick } = props;
  return (
    <TagListContainer>
      <TagListHeader>Popular Tags</TagListHeader>
      {isFetching ? (
        <span>Loading...</span>
      ) : (
        <Tags tags={tags} onTagClick={onTagClick} />
      )}
    </TagListContainer>
  );
};

export default HomeTags;
