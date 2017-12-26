import React, { Component } from "react";
import { connect } from "react-redux";

import { getCurrArticle, getIsCurrArticleFetching } from "../reducers/";
import { fetchArticle } from "../actions";

class Article extends Component {
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { dispatch, match: { params: { slug } } } = this.props;
    return dispatch(fetchArticle(slug));
  }
  render() {
    const { article, isFetching } = this.props;
    const { title, author, body } = article;
    if (isFetching && !article.title) return <p>Loading...</p>;
    return (
      <div>
        <h1>{title}</h1>
        <h3>{`Author: ${author.username}`}</h3>
        <p>{body}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article: getCurrArticle(state),
    isFetching: getIsCurrArticleFetching(state)
  };
};

Article = connect(mapStateToProps)(Article);

export default Article;
