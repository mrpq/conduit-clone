import React, { Component, Fragment } from "react";
import ArticlesContainer from "../Layout/ArticlesContainer";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./Pagination";

class View extends Component {
  render() {
    const { articles, onArticleClick } = this.props;
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

export default View;
