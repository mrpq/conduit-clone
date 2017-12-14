import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ArticlesContainer from "../Layout/ArticlesContainer";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./Pagination";

import { getArticles } from "../reducers/";

class View extends Component {
  render() {
    const { articles, onArticleClick } = this.props;
    console.log("Boop");
    return (
      <Fragment>
        <ArticlesContainer>
          {articles.map(article => {
            return (
              <ArticlePreview
                key={article.slug}
                article={article}
                onArticleClick={onArticleClick}
              />
            );
          })}
        </ArticlesContainer>
        <Pagination />
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    articles: getArticles(state)
  };
};

View = connect(mapStateToProps)(View);

export default View;
