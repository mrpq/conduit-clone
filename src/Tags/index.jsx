import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import { getTags } from "../reducers/";
import { setCurrTab } from "../actions/index";

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
`;

class Tags extends Component {
  render() {
    const { tags: { tags, isFetching }, dispatch } = this.props;
    return (
      <TagListContainer>
        <TagListHeader>Popular Tags</TagListHeader>
        {isFetching ? (
          <span>Loading...</span>
        ) : (
          <TagList>
            {tags.map((tag, i) => (
              <Tag
                key={i}
                onClick={() => dispatch(setCurrTab({ type: "tag", tag }))}
              >
                {tag}
              </Tag>
            ))}
          </TagList>
        )}
      </TagListContainer>
    );
  }
}
Tags.propTypes = {
  tags: PropTypes.object
};
const mapStateToProps = state => {
  return {
    tags: getTags(state)
  };
};
Tags = connect(mapStateToProps)(Tags);

export default Tags;
