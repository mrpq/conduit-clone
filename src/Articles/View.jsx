import React, { Component } from "react";
import ArticlesContainer from "../Layout/ArticlesContainer";
import ArticlePreview from "./ArticlePreview";

class View extends Component {
  render() {
    console.log("1!!!!!!!!!!!!>>>>>>");
    const { articles, onArticleClick } = this.props;
    return (
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
    );
  }
}

export default View;
