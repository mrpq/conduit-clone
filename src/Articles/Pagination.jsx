import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import { setPage } from "../actions";
import { getCurrTab } from "../reducers/currTab";
import { getArticlesCount } from "../reducers";

const PagesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
const PageListItem = styled.li`
  padding: 10px;
  color: #4fb862;
  border: 1px solid #b2b2b2;
  border-right: none;
  ${({ isActive }) =>
    isActive &&
    css`
      color: #fff;
      border: none;
      background-color: #4fb862;
    `}
  }
`;
const Link = styled.a``;

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = pageNum => e => {
    e.preventDefault;
    const { dispatch } = this.props;
    dispatch(setPage({ page: pageNum }));
  };
  createPages(pagesCount, currPage) {
    const pages = [];
    for (let i = 0; i < pagesCount; i += 1) {
      pages.push(
        <PageListItem isActive={i === currPage}>
          <Link onClick={this.handlePageClick(i)}>{i + 1}</Link>
        </PageListItem>
      );
    }
    console.log(pages.length);
    return pages;
  }
  render() {
    const { articlesCount, currTab: { pagination } } = this.props;
    const pagesCount = articlesCount / pagination.limit;
    if (pagesCount <= 1) {
      return null;
    } else {
      return (
        <footer>
          <nav>
            <PagesList>
              {this.createPages(pagesCount, pagination.page)}
            </PagesList>
          </nav>
        </footer>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    articlesCount: getArticlesCount(state),
    currTab: getCurrTab(state)
  };
};

Pagination = connect(mapStateToProps)(Pagination);

export default Pagination;
