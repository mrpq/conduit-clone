import { createAction } from "redux-actions";
import axios from "axios";

// import { getUsername } from "../reducers/";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_SUCCESS,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  PROFILE_FETCH_REQUEST,
  PROFILE_FETCH_SUCCESS,
  PROFILE_FETCH_FAILURE,
  PROFILE_FOLLOW_REQUEST,
  PROFILE_FOLLOW_SUCCESS,
  PROFILE_FOLLOW_FAILURE,
  ARTICLES_FETCH_REQUEST,
  ARTICLES_FETCH_SUCCESS,
  ARTICLES_FETCH_FAILURE,
  ARTICLE_PUBLISH_REQUEST,
  ARTICLE_PUBLISH_SUCCESS,
  ARTICLE_PUBLISH_FAILURE,
  ARTICLE_FETCH_REQUEST,
  ARTICLE_FETCH_SUCCESS,
  ARTICLE_FETCH_FAILURE,
  CURR_TAB_SET,
  PAGE_SET,
  TAG_FETCH_REQUEST,
  TAG_FETCH_SUCCESS,
  TAG_FETCH_FAILURE
} from "./constants";

export const loginUserSuccess = createAction(USER_LOGIN_SUCCESS);
export const loginUserFailure = createAction(USER_LOGIN_FAILURE);

const fetchUserRequest = createAction(USER_FETCH_REQUEST);
const fetchUserSuccess = createAction(USER_FETCH_SUCCESS);

const updateUserRequest = createAction(USER_UPDATE_REQUEST);
const updateUserSuccess = createAction(USER_UPDATE_SUCCESS);
const updateUserFailure = createAction(USER_UPDATE_FAILURE);

const fetchProfileRequest = createAction(PROFILE_FETCH_REQUEST);
const fetchProfileSuccess = createAction(PROFILE_FETCH_SUCCESS);
const fetchProfileFailure = createAction(PROFILE_FETCH_FAILURE);

const followProfileRequest = createAction(PROFILE_FOLLOW_REQUEST);
const followProfileSuccess = createAction(PROFILE_FOLLOW_SUCCESS);
const followProfileFailure = createAction(PROFILE_FOLLOW_FAILURE);

const fetchArticlesRequest = createAction(ARTICLES_FETCH_REQUEST);
const fetchArticlesSuccess = createAction(ARTICLES_FETCH_SUCCESS);
const fetchArticlesFailure = createAction(ARTICLES_FETCH_FAILURE);

const publishArticleRequest = createAction(ARTICLE_PUBLISH_REQUEST);
const publishArticleSuccess = createAction(ARTICLE_PUBLISH_SUCCESS);
const publishArticleFailure = createAction(ARTICLE_PUBLISH_FAILURE);

const fetchArticleRequest = createAction(ARTICLE_FETCH_REQUEST);
const fetchArticleSuccess = createAction(ARTICLE_FETCH_SUCCESS);
const fetchArticleFailure = createAction(ARTICLE_FETCH_FAILURE);

export const setCurrTab = createAction(CURR_TAB_SET);
export const setPage = createAction(PAGE_SET);

export const fetchTagsRequest = createAction(TAG_FETCH_REQUEST);
export const fetchTagsSuccess = createAction(TAG_FETCH_SUCCESS);
export const fetchTagsFailure = createAction(TAG_FETCH_FAILURE);

const requestAPI = (endpoint, options = {}) => {
  const BASE_URL = "https://conduit.productionready.io";
  const requestOptions = {
    url: `${BASE_URL}${endpoint}`,
    method: "GET",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  };
  return axios(requestOptions);
};
const requestAPIWithAuthToken = (endpoint, options) => {
  const headers = {};
  const token = localStorage.getItem("jwt_token");
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  return requestAPI(endpoint, { ...options, headers });
};

export const loginUser = ({ email, password }) => dispatch => {
  dispatch({
    type: USER_LOGIN_REQUEST
  });
  return requestAPI("/api/users/login", {
    method: "POST",
    data: { user: { email, password } }
  })
    .then(({ data }) => {
      localStorage.setItem("jwt_token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return dispatch(loginUserSuccess({ user: data.user }));
    })
    .catch(({ response }) => {
      return dispatch(loginUserFailure({ errors: response.data.errors }));
    });
};

export const logoutUser = () => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user");
  return { type: USER_LOGOUT_SUCCESS };
};

export const updateUser = user => dispatch => {
  dispatch(updateUserRequest());
  return requestAPIWithAuthToken("/api/user", {
    method: "PUT",
    // headers: { Authorization: `Token ${token}` },
    data: { user }
  })
    .then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      return dispatch(updateUserSuccess({ user: data.user }));
    })
    .catch(error => console.log(error));
};

export const fetchArticles = (endpoint, params) => dispatch => {
  dispatch(fetchArticlesRequest());
  return requestAPIWithAuthToken(endpoint, { params }).then(({ data }) => {
    dispatch(
      fetchArticlesSuccess({
        articles: data.articles,
        articlesCount: data.articlesCount
      })
    );
  });
};

export const publishArticle = article => dispatch => {
  dispatch(publishArticleRequest());
  requestAPI("/api/articles", {
    method: "POST",
    data: { article }
  }).then(({ data }) => {
    dispatch(publishArticleSuccess({ article: data.article }));
    return data.article;
  });
};

export const fetchArticle = slug => dispatch => {
  dispatch(fetchArticleRequest());
  requestAPI(`/api/articles/${slug}`).then(({ data }) => {
    return dispatch(fetchArticleSuccess({ article: data.article }));
  });
};

export const fetchTags = () => dispatch => {
  dispatch(fetchTagsRequest());
  return requestAPI("/api/tags").then(({ data }) => {
    return dispatch(fetchTagsSuccess({ tags: data.tags }));
  });
};

export const fetchProfile = username => dispatch => {
  console.log("fetch profile!");
  dispatch(fetchProfileRequest());
  return requestAPI(`/api/profiles/${username}`).then(({ data }) => {
    return dispatch(fetchProfileSuccess({ profile: data.profile }));
  });
};

export const followProfile = (username, follow = true) => dispatch => {
  dispatch(followProfileRequest());
  return requestAPI(`/api/profiles/${username}/follow`, {
    method: follow ? "POST" : "DELETE"
  }).then(({ data }) => {
    return dispatch(followProfileSuccess({ profile: data.profile }));
  });
};
