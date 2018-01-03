import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Heading from "../Heading/";
import Errors from "../Errors/";
import {
  LargeInput,
  SmallInput,
  SubmitButton,
  Textarea
} from "../common/inputs";
import { MainContainer } from "../common/containers";
import { publishArticle, clearEditorErrors } from "../actions/";
import { getCurrArticleErrors, getArticleIsPublishing } from "../reducers/";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: ""
    };
    this.clearErrors();
  }
  componentDidMount() {}

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

const mapStateToProps = state => {
  return {
    errors: getCurrArticleErrors(state),
    isPublishing: getArticleIsPublishing(state)
  };
};

Editor = connect(mapStateToProps)(Editor);

export default Editor;
