import {
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILURE
} from "../actions/constants";

const commentDeleteRequest = (state = { pending: false }, action) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return { pending: true };
    case COMMENT_DELETE_SUCCESS:
      return { pending: false };
    case COMMENT_DELETE_FAILURE:
      return { pending: false };
    default:
      return state;
  }
};

export default commentDeleteRequest;

export const getIsCommentDeleteRequestPending = state => {
  return state.pending;
};
