import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchArticles, fetchArticle } from "../actions";
import { getArticles } from "../reducers";
import { getCurrTab } from "../reducers/currTab";
import View from "./View";

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
        {desctiption ||
          body
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

  componentDidUpdate(prevProps) {
    const { currTab: prevCurrTab } = prevProps;
    const { currTab: currCurrTab } = this.props;
    if (
      prevCurrTab.type !== currCurrTab.type ||
      prevCurrTab.pagination.page !== currCurrTab.pagination.page
    ) {
      this.fetchData();
    }
  }

  fetchData() {
    const { fetchArticles, currTab } = this.props;
    const { pagination: { limit, page } } = currTab;
    const params = {
      limit,
      offset: limit * page
    };
    let endpoint = "/api/articles";
    if (currTab.type === "feed") {
      endpoint = "/api/articles/feed";
    }
    if (currTab.type === "user") params["user"] = currTab.user;
    return fetchArticles(endpoint, params);
  }

  render() {
    const { articles, onArticleClick } = this.props;
    return <View {...this.props} />;
  }
}

Feed.propTypes = {
  articles: PropTypes.array,
  currTab: PropTypes.object
};
const mapStateToProps = (state, ownProps) => {
  return {
    articles: getArticles(state),
    currTab: getCurrTab(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchArticles: (...params) => dispatch(fetchArticles(...params)),
    onArticleClick: slug => {
      dispatch(fetchArticle(slug));
      dispatch(push(`/article/${slug}`));
    }
  };
};

Feed = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default Feed;
