import styled from "styled-components";

export const CommentContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 1em;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #ccc;
  & > * + * {
    margin-left: 5px;
  }
`;
