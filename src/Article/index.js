import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Heading from "../Heading/";
import Banner from "./Banner";
import ArticleContent from "./ArticleContent";
import Comments from "./Comments";
import { MainContainer } from "../common/containers";
import { getCurrArticle, getIsCurrArticleFetching } from "../reducers/";
import { fetchArticle } from "../actions/index";
import { fetchProfile } from "../actions/index";

class Article extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { dispatch, match: { params: { slug } } } = this.props;
    return dispatch(fetchArticle(slug)).then(article => {
      return dispatch(fetchProfile(article.author.username));
    });
  }
  render() {
    const { article, isFetching, match: { params: { slug } } } = this.props;
    const { title, author, body } = article;
    if (isFetching && !article.title) return <p>Loading...</p>;
    return (
      <Fragment>
        <Heading withBanner={false} />
        <Banner article={article} />
        <MainContainer>
          <ArticleContent article={article} />
          <Comments slug={slug} />
        </MainContainer>
      </Fragment>
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
