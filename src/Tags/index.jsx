import React from "react";
import styled from "styled-components";

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Tag = styled.li`
  padding: 4px 8px;
  margin-right: 4px;
  margin-bottom: 5px;
  font-size: 0.75em;
  line-height: 1em;
  border-radius: 9px;
  background-color: #808a90;
  color: #fff;
  cursor: pointer;
`;

const Tags = ({ tags, onTagClick }) => {
  if (!tags.length) return null;
  return (
    <TagList>
      {tags.map(tag => {
        return (
          <Tag key={tag} onClick={() => onTagClick(tag)}>
            {tag}
          </Tag>
        );
      })}
    </TagList>
  );
};

export default Tags;
