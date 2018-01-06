import React from "react";
import styled from "styled-components";
import { DateTime } from "luxon";

import { Avatar } from "./Banner";
import { CommentContainer, Footer } from "./common";
import { withAuth } from "../RenderWithAuthHOC";

const TinyAvatar = Avatar.extend`
  height: 20px;
  width: 20px;
`;

const CommentBody = styled.div`
  padding: 1.25rem;
  line-height 1.5;
  p {
    margin: 0;
  }
`;

const AuthorLink = styled.a`
  color: #5cb85c;
  font-size: 0.8em;
  &:hover {
    color: #419641;
    text-decoration: underline;
  }
`;

const CommentDate = styled.span`
  font-size: 0.8em;
  font-size: 0.8em;
  color: #bbb;
`;

const CommentDeleteButton = ({ onDeleteClick, commentIsDeleteing }) => {
  const Button = styled.button`
    margin-left: auto;
    font-size: 0;
    font-family: "Ionicons";
    border: none;
    background: transparent;
    cursor: ${({ disabled }) => (disabled ? "wait" : "pointer")};
    opacity: 0.6;
    color: #333;
    &::before {
      content: "\f252";
      font-size: 1rem;
    }
  `;
  return (
    <Button
      className="ion-trash-a"
      disabled={commentIsDeleteing}
      onClick={() => onDeleteClick()}
    >
      Delete
    </Button>
  );
};

let CommentDeleteButtonContainer = ({
  author,
  onDeleteClick,
  commentIsDeleteing
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.username === author.username) {
    return (
      <CommentDeleteButton
        onDeleteClick={onDeleteClick}
        commentIsDeleteing={commentIsDeleteing}
      />
    );
  } else {
    return null;
  }
};
// CommentDeleteButtonContainer = withAuth(CommentDeleteButtonContainer, {
//   authRequired: true
// });

const Comment = ({
  id,
  createdAt,
  body,
  author,
  onAuthorClick,
  onDeleteClick,
  commentIsDeleteing
}) => {
  return (
    <CommentContainer>
      <CommentBody>
        <p>{body}</p>
      </CommentBody>
      <Footer>
        <TinyAvatar />
        <AuthorLink
          href={`/@${author.username}`}
          onClick={e => {
            e.preventDefault();
            onAuthorClick(author.username);
          }}
        >
          {author.username}
        </AuthorLink>
        <CommentDate>
          {DateTime.fromISO(createdAt).toLocaleString()}
        </CommentDate>
        <CommentDeleteButtonContainer
          author={author}
          onDeleteClick={onDeleteClick}
          commentIsDeleteing={commentIsDeleteing}
        />
      </Footer>
    </CommentContainer>
  );
};

export default Comment;
