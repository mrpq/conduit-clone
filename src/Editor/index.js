import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import pick from "lodash/pick";

import Heading from "../Heading/";
import Errors from "../Errors/";
import { withAuth } from "../RenderWithAuthHOC";
import {
  LargeInput,
  SmallInput,
  SubmitButton,
  Textarea
} from "../common/inputs";
import { MainContainer } from "../common/containers";
import { publishArticle, clearEditorErrors, fetchArticle } from "../actions/";
import {
  getCurrArticleErrors,
  getArticleIsPublishing,
  getCurrArticle
} from "../reducers/";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: ""
    };
    // const { article = null } = this.props;
    // this.state = article
    //   ? pick(article, ["title", "description", "body", "tagList"])
    //   : formFields;
    this.clearErrors();
  }
  componentDidMount() {
    this.fetchData();
  }

  handleChange = e => {
    const { target: { value, name } } = e;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(
      publishArticle({
        title: this.state.title,
        description: this.state.description,
        body: this.state.body,
        tagList: this.state.tagList.split(",")
      })
    );
  };

  clearErrors() {
    const { dispatch } = this.props;
    dispatch(clearEditorErrors());
  }

  fetchData() {
    const { dispatch, match: { params: { slug } } } = this.props;
    slug &&
      dispatch(fetchArticle(slug)).then(article =>
        this.setState(
          pick(article, ["title", "description", "body", "tagList"])
        )
      );
  }

  render() {
    const { isPublishing, errors } = this.props;
    return (
      <Fragment>
        <Heading />
        <MainContainer>
          {errors ? <Errors errors={errors} /> : null}
          <form>
            <LargeInput
              type="text"
              name="title"
              placeholder="Article Title"
              value={this.state.title}
              onChange={this.handleChange}
              disabled={isPublishing}
            />
            <SmallInput
              type="text"
              name="description"
              placeholder="What's this article about?"
              value={this.state.description}
              onChange={this.handleChange}
              disabled={isPublishing}
            />
            <Textarea
              name="body"
              value={this.state.body}
              placeholder="Write your article (in markdown)"
              onChange={this.handleChange}
              disabled={isPublishing}
            />
            <SmallInput
              type="text"
              name="tagList"
              value={this.state.tagList}
              placeholder="Enter tags"
              onChange={this.handleChange}
              disabled={isPublishing}
            />
            <div style={{ textAlign: "right" }}>
              <SubmitButton onClick={this.handleSubmit} disabled={isPublishing}>
                Publish Article
              </SubmitButton>
            </div>
          </form>
        </MainContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    errors: getCurrArticleErrors(state),
    isPublishing: getArticleIsPublishing(state)
  };
};

Editor = withAuth(connect(mapStateToProps)(Editor), { redirectTo: "/" });

export default Editor;
