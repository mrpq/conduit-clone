import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import { MainContainer } from "../common/containers";
import { fetchComments, deleteComment, postComment } from "../actions/";
import { getComments } from "../reducers/index";
import { getIsCommentDeleteRequestPending } from "../reducers/";

const AuthBlock = () => {
  return (
    <Fragment>
      <p>
        <a href="/login">Sign in</a> or <a href="/register">Sign up</a> to add
        comments on this article.
      </p>
    </Fragment>
  );
};

class Comments extends Component {
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { slug, dispatch } = this.props;
    dispatch(fetchComments(slug));
  }
  render() {
    const {
      comments,
      slug,
      onDeleteClick,
      onSubmitCommentClick,
      onAuthorClick,
      commentIsDeleteing
    } = this.props;
    return (
      <Fragment>
        <CommentForm onSubmitCommentClick={onSubmitCommentClick(slug)} />
        <CommentsList
          comments={comments}
          onDeleteClick={onDeleteClick(slug)}
          onAuthorClick={onAuthorClick}
          commentIsDeleteing={commentIsDeleteing}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: getComments(state),
    commentIsDeleteing: getIsCommentDeleteRequestPending(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onDeleteClick: slug => id => () => {
      dispatch(deleteComment(slug, id));
    },
    onSubmitCommentClick: slug => comment => {
      return dispatch(postComment(slug, comment));
    },
    onAuthorClick: username => {
      dispatch(push(`/@${username}`));
    }
  };
};

Comments = connect(mapStateToProps, mapDispatchToProps)(Comments);

export default Comments;
