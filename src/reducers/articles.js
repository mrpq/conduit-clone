import { createSelector } from "reselect";
import {
  ARTICLES_FETCH_REQUEST,
  ARTICLES_FETCH_SUCCESS,
  ARTICLES_FETCH_FAILURE
} from "../actions/constants";

const articles = (
  state = { articles: [], isFetching: true, articlesCount: 0 },
  action
) => {
  switch (action.type) {
    case ARTICLES_FETCH_REQUEST:
      return { ...state, isFetching: true };
    case ARTICLES_FETCH_SUCCESS:
      return {
        isFetching: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount
      };
    default:
      return state;
    case ARTICLES_FETCH_FAILURE:
      return { ...state, isFetching: false, errors: action.payload.errors };
  }
};
export default articles;

export const getArticles = state => {
  return state.articles;
};

export const getArticle = (state, slug) => {
  return state.articles.find(article => article.slug === slug);
};

// not used anywhere?
export const makeGetArticle = () => {
  return createSelector(getArticle, article => article);
};

export const getArticlesCount = state => {
  return state.articlesCount;
};

export const getIsArticlesFetching = state => state.isFetching;

export const getErrors = state => state.errors;
