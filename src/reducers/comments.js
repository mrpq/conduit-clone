import { createSelector } from "reselect";
import {
  COMMENTS_FETCH_REQUEST,
  COMMENTS_FETCH_SUCCESS,
  COMMENTS_FETCH_FAILURE,
  COMMENT_DELETE_SUCCESS,
  COMMENT_POST_SUCCESS
} from "../actions/constants";

const updateStateWithComment = (state, article) => {
  return {
    ...state,
    articles: state.articles.map(a => {
      if (a.slug === article.slug) return article;
      return a;
    })
  };
};

const comments = (state = { comments: [], isFetching: true }, action) => {
  switch (action.type) {
    case COMMENTS_FETCH_REQUEST:
      return { comments: [], isFetching: true };
    case COMMENTS_FETCH_SUCCESS:
      return { comments: action.payload.comments, isFetching: false };
    case COMMENTS_FETCH_FAILURE:
      return { ...state, isFetching: false };
    case COMMENT_POST_SUCCESS: {
      return {
        ...state,
        comments: [action.payload.comment, ...state.comments]
      };
    }
    case COMMENT_DELETE_SUCCESS: {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload.id
        )
      };
    }
    default:
      return state;
  }
};
export default comments;

export const getComments = state => {
  return state.comments;
};

// export const getArticle = (state, slug) => {
//   return state.comments.find(article => article.slug === slug);
// };
