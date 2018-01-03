import {
  ARTICLE_FETCH_REQUEST,
  ARTICLE_FETCH_SUCCESS,
  ARTICLE_FETCH_FAILURE,
  ARTICLE_PUBLISH_SUCCESS,
  ARTICLE_PUBLISH_REQUEST,
  ARTICLE_PUBLISH_FAILURE,
  EDITOR_ERRORS_CLEAR
} from "../actions/constants";

const currArticle = (
  state = { article: {}, isFetching: true, isPublishing: false, errors: null },
  action
) => {
  switch (action.type) {
    case ARTICLE_FETCH_REQUEST:
      return { ...state, article: {}, isFetching: true };
    case ARTICLE_PUBLISH_REQUEST:
      return { ...state, article: {}, isPublishing: true };
    case ARTICLE_FETCH_SUCCESS:
      return { ...state, article: action.payload.article, isFetching: false };
    case ARTICLE_PUBLISH_SUCCESS:
      return { ...state, article: action.payload.article, isPublishing: false };
    case ARTICLE_FETCH_FAILURE:
      return {
        ...state,
        article: {},
        isFetching: false,
        errors: action.payload.errors
      };
    case ARTICLE_PUBLISH_FAILURE:
      return {
        ...state,
        article: {},
        isPublishing: false,
        errors: action.payload.errors
      };
    case EDITOR_ERRORS_CLEAR:
      return { ...state, errors: null };
    default:
      return state;
  }
};
export default currArticle;

export const getCurrArticle = state => {
  return state.article;
};
export const getIsCurrArticleFetching = state => {
  return state.isFetching;
};

export const getCurrArticleErrors = state => {
  return state.errors;
};
export const getArticleIsPublishing = state => {
  return state.isPublishing;
};
