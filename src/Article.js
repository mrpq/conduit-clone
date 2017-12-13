import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getArticles,
  getCurrArticle,
  getIsCurrArticleFetching
} from "./reducers";
import { fetchArticle } from "./actions";

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
Article.propTypes = {
  article: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    article: getCurrArticle(state),
    isFetching: getIsCurrArticleFetching(state)
  };
};

Article = connect(mapStateToProps)(Article);

export default Article;
