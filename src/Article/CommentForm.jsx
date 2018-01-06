import React, { Component } from "react";
import styled from "styled-components";
import { compose, withState, withHandlers } from "recompose";

import { Avatar } from "./Banner";
import { CommentContainer, Footer } from "./common";
import { Textarea, SubmitButton } from "../common/inputs";

const SmallAvatar = Avatar.extend`
  height: 30px;
  width: 30px;
`;

const CommentTextArea = Textarea.extend`
  padding: 20px;
  margin-bottom: 0;
  border: none;
  border-radius: 3px 3px 0 0;
`;

const CommentSubmitButton = SubmitButton.extend`
  padding: 0.25rem 0.5rem;
  font-size: 0.875em;
  font-weight: 700;
  border-radius: 0.2rem;
`;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { target: { value } } = e;
    this.setState({ comment: value });
  }

  render() {
    const { onSubmitCommentClick } = this.props;
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <CommentContainer>
        <CommentTextArea
          placeholder="Write a comment..."
          value={this.state.comment}
          onChange={this.handleChange}
        />
        <Footer>
          <SmallAvatar image={user && user.image} />
          <CommentSubmitButton
            onClick={() => {
              onSubmitCommentClick(this.state.comment).then(res =>
                this.setState({ comment: "" })
              );
            }}
          >
            PostComment
          </CommentSubmitButton>
        </Footer>
      </CommentContainer>
    );
  }
}

export default CommentForm;
