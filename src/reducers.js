import { combineReducers } from "redux";
import { createSelector } from "reselect";

import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  loginUserFailure,
  loginUserSuccess,
  USER_FETCH_SUCCESS,
  USER_LOGOUT_SUCCESS,
  ARTICLES_FETCH_SUCCESS,
  ARTICLES_FETCH_REQUEST,
  ARTICLES_FETCH_FAILURE,
  ARTICLE_FETCH_REQUEST,
  ARTICLE_FETCH_SUCCESS
} from "./actions";

export const auth = (
  state = {
    isAuthenticated: localStorage.getItem("jwt_token") ? true : false,
    isFetching: true
  },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return { isAuthenticated: false, isFetching: true };
    }
    case USER_LOGIN_SUCCESS:
      return { isAuthenticated: true, isFetching: false };
    case USER_LOGIN_FAILURE:
      const errors = action.payload.errors;
      return { ...state, isFetching: false, errors };
    case USER_LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
export const user = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
    case USER_FETCH_SUCCESS:
      return action.payload.user;
    case USER_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export const articles = (
  state = { articles: [], isFetching: true },
  action
) => {
  switch (action.type) {
    case ARTICLES_FETCH_REQUEST:
      return { ...state, isFetching: true };
    case ARTICLES_FETCH_SUCCESS:
      return { ...state, isFetching: false, articles: action.payload.articles };
    default:
      return state;
    case ARTICLES_FETCH_FAILURE:
      return { ...state, isFetching: false, errors: action.payload.errors };
  }
};

export const currArticle = (
  state = { article: {}, isFetching: true },
  action
) => {
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

export const getIsAuthenticated = state => {
  return state.auth.isAuthenticated;
};

export const getUsername = state => {
  return state.user.username;
};

export const getArticles = state => {
  return state.articles.articles;
};

const getArticle = (state, slug) => {
  return state.articles.articles.find(article => article.slug === slug);
};
export const makeGetArticle = () => {
  return createSelector(getArticle, article => article);
};

export const getCurrArticle = state => {
  return state.currArticle.article;
};
export const getIsCurrArticleFetching = state => {
  return state.currArticle.isFetching;
};
