import React from "react";

import Comment from "./Comment";

const CommentsList = ({
  comments,
  onDeleteClick,
  onAuthorClick,
  commentIsDeleteing
}) => {
  return (
    <div>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          {...comment}
          onAuthorClick={onAuthorClick}
          onDeleteClick={onDeleteClick(comment.id)}
          commentIsDeleteing={commentIsDeleteing}
        />
      ))}
    </div>
  );
};

export default CommentsList;
