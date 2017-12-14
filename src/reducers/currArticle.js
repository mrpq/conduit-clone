import {
  ARTICLE_FETCH_REQUEST,
  ARTICLE_FETCH_SUCCESS
} from "../actions/constants";

const currArticle = (state = { article: {}, isFetching: true }, action) => {
  switch (action.type) {
    case ARTICLE_FETCH_REQUEST: {
      return { ...state, article: {}, isFetching: true };
    }
    case ARTICLE_FETCH_SUCCESS: {
      return { ...state, article: action.payload.article, isFetching: false };
    }
    default:
      return state;
  }
};
export default currArticle;

export const getCurrArticle = state => {
  return state.currArticle.article;
};
export const getIsCurrArticleFetching = state => {
  return state.currArticle.isFetching;
};
