import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import isEqual from "lodash/isEqual";
import { fetchArticles, fetchArticle } from "../actions/";
import { getArticles, getCurrTab } from "../reducers/";
import ArticlesList from "./ArticlesList";

class Articles extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { currTab: prevCurrTab } = prevProps;
    const { currTab: currCurrTab } = this.props;
    !isEqual(prevCurrTab, currCurrTab) && this.fetchData();
  }

  fetchData() {
    const { dispatch, currTab } = this.props;
    const { pagination: { limit, page } } = currTab;
    const params = {
      limit,
      offset: limit * page
    };
    let endpoint = "/api/articles";
    if (currTab.type === "feed") {
      endpoint = "/api/articles/feed";
    }
    if (currTab.type === "user") params["author"] = currTab.user;
    if (currTab.type === "tag") params["tag"] = currTab.tag;
    return dispatch(fetchArticles(endpoint, params));
  }

  render() {
    // const { onArticleClick } = this.props;
    // return <ArticlesList {...this.props} />;
    return <ArticlesList />;
  }
}

Articles.propTypes = {
  currTab: PropTypes.object
};
const mapStateToProps = (state, ownProps) => {
  return {
    currTab: getCurrTab(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // fetchArticles: (...params) => dispatch(fetchArticles(...params)),
    onArticleClick: slug => {
      dispatch(fetchArticle(slug));
      dispatch(push(`/article/${slug}`));
    }
  };
};

Articles = connect(mapStateToProps)(Articles);

export default Articles;
