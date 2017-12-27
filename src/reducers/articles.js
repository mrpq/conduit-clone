import { createSelector } from "reselect";
import {
  ARTICLES_FETCH_REQUEST,
  ARTICLES_FETCH_SUCCESS,
  ARTICLES_FETCH_FAILURE,
  LIKE_TOGGLE_SUCCESS
} from "../actions/constants";

const updateStateWithArticle = (state, article) => {
  return {
    ...state,
    articles: state.articles.map(a => {
      if (a.slug === article.slug) return article;
      return a;
    })
  };
};

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
    case ARTICLES_FETCH_FAILURE:
      return { ...state, isFetching: false, errors: action.payload.errors };
    case LIKE_TOGGLE_SUCCESS:
      return updateStateWithArticle(state, action.payload.article);
    default:
      return state;
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
