import React, { Component, Fragment } from "react";
import styled from "styled-components";

import Heading from "../Heading/";
import { UniversalContainer } from "../Layout/";
import { publishArticle } from "../actions";

export const LargeInput = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 12px 24px;
  border: 1px solid #b2b2b2;
  border-radius: 5px;
  font-size: 1.25em;
  line-height: 1.25;
  color: #54595b;
`;
export const SmallInput = LargeInput.extend`
  padding: 8px 12px;
  font-size: 1em;
`;
export const Textarea = SmallInput.extend`
  resize: vertical;
`.withComponent("textarea");

export const SubmitButton = styled.button`
  margin-left: auto;
  padding: 12px 24px;
  font-size: 1.25em;
  border-radius: 5px;
  background-color: #4fb862;
  color: #fff;
`;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: ""
    };
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

  render() {
    return (
      <Fragment>
        <Heading />
        <UniversalContainer>
          <form>
            <LargeInput
              type="text"
              name="title"
              placeholder="Article Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <SmallInput
              type="text"
              name="description"
              placeholder="What's this article about?"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <Textarea
              name="body"
              value={this.state.body}
              placeholder="What's this article about?"
              onChange={this.handleChange}
            />
            <SmallInput
              type="text"
              name="tagList"
              value={this.state.tagList}
              placeholder="Enter tags"
              onChange={this.handleChange}
            />
            <div style={{ textAlign: "right" }}>
              <SubmitButton onClick={this.handleSubmit}>
                Publish Article
              </SubmitButton>
            </div>
          </form>
        </UniversalContainer>
      </Fragment>
    );
  }
}

// Editor = connect()(Editor);

export default Editor;
