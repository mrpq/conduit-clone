import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchArticles, fetchArticle } from "../actions";
import { getArticles } from "../reducers";

const ArticlePreview = ({ article, onArticleClick }) => {
  const {
    author,
    slug,
    tagList,
    createdAt,
    title,
    favourited,
    favouritesCount,
    body,
    desctiption
  } = article;
  return (
    <div>
      <h4>{`Author: ${author.username}`}</h4>
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          onArticleClick(slug);
        }}
      >
        {title}
      </a>
      <p>
        {body
          .split(" ")
          .slice(0, 10)
          .join(" ")}
      </p>
      {tagList.length ? (
        <ul>{tagList.map((tag, i) => <li key={i}>{tag}</li>)}</ul>
      ) : null}
      <hr />
    </div>
  );
};

class Feed extends Component {
  componentDidMount() {
    this.fetchData();
  }
  componentWillUpdate() {
    // this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.forUser !== this.props.forUser) {
      this.fetchData();
    }
  }

  fetchData() {
    const { fetchArticles, forUser } = this.props;
    const params = {};
    if (forUser) params.author = forUser;
    // return dispatch(fetchArticles(params));
    return fetchArticles(params);
  }

  render() {
    const { articles, onArticleClick } = this.props;
    return (
      <ul>
        {articles.map(article => {
          return (
            <ArticlePreview
              key={article.slug}
              article={article}
              onArticleClick={onArticleClick}
            />
          );
        })}
      </ul>
    );
  }
}

Feed.propTypes = {
  articles: PropTypes.array
};
const mapStateToProps = (state, ownProps) => {
  return {
    articles: getArticles(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchArticles: params => dispatch(fetchArticles(params)),
    onArticleClick: slug => {
      dispatch(fetchArticle(slug));
      dispatch(push(`/article/${slug}`));
    }
  };
};

Feed = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default Feed;
