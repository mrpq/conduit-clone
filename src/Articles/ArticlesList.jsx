import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import ArticlePreview from "./ArticlePreview";
import Pagination from "./Pagination";

import { fetchArticles, fetchArticle } from "../actions/";
import {
  getArticles,
  getIsArticlesFetching,
  getFetchArticlesErrors
} from "../reducers/";

class ArticlesList extends Component {
  render() {
    const {
      articles,
      isFetching,
      errors,
      onArticleClick,
      onAuthorClick
    } = this.props;
    if (isFetching) return <p>Loading articles...</p>;
    return (
      <Fragment>
        <div>
          {articles.map(article => {
            return (
              <ArticlePreview
                key={article.slug}
                article={article}
                onArticleClick={onArticleClick}
                onAuthorClick={onAuthorClick}
              />
            );
          })}
        </div>
        <Pagination />
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    articles: getArticles(state),
    isFetching: getIsArticlesFetching(state),
    errors: getFetchArticlesErrors(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onArticleClick: slug => {
      dispatch(push(`/article/${slug}`));
    },
    onAuthorClick: username => {
      dispatch(push(`/@${username}`));
    }
  };
};

ArticlesList = connect(mapStateToProps, mapDispatchToProps)(ArticlesList);

export default ArticlesList;
