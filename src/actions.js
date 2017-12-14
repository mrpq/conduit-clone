import { createAction } from "redux-actions";
import axios from "axios";
import { getUsername } from "./reducers";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_FETCH_REQUEST = "USER_FETCH_REQUEST";
export const USER_FETCH_SUCCESS = "USER_FETCH_SUCCESS";
export const USER_FETCH_FAILURE = "USER_FETCH_FAILURE";
export const ARTICLES_FETCH_REQUEST = "ARTICLES_FETCH_REQUEST";
export const ARTICLES_FETCH_SUCCESS = "ARTICLES_FETCH_SUCCESS";
export const ARTICLES_FETCH_FAILURE = "ARTICLES_FETCH_FAILURE";
export const ARTICLE_PUBLISH_REQUEST = "ARTICLE_PUBLISH_REQUEST";
export const ARTICLE_PUBLISH_SUCCESS = "ARTICLE_PUBLISH_SUCCESS";
export const ARTICLE_PUBLISH_FAILURE = "ARTICLE_PUBLISH_FAILURE";
export const ARTICLE_FETCH_REQUEST = "ARTICLE_FETCH_REQUEST";
export const ARTICLE_FETCH_SUCCESS = "ARTICLE_FETCH_SUCCESS";
export const ARTICLE_FETCH_FAILURE = "ARTICLE_FETCH_FAILURE";

export const CURR_TAB_SET = "CURR_TAB_SET";

export const loginUserSuccess = createAction(USER_LOGIN_SUCCESS);
export const loginUserFailure = createAction(USER_LOGIN_FAILURE);

const fetchUserRequest = createAction(USER_FETCH_REQUEST);
const fetchUserSuccess = createAction(USER_FETCH_SUCCESS);

const fetchArticlesSuccess = createAction(ARTICLES_FETCH_SUCCESS);

const publishArticleRequest = createAction(ARTICLE_PUBLISH_REQUEST);
const publishArticleSuccess = createAction(ARTICLE_PUBLISH_SUCCESS);
const publishArticleFailure = createAction(ARTICLE_PUBLISH_FAILURE);

const fetchArticleRequest = createAction(ARTICLE_FETCH_REQUEST);
const fetchArticleSuccess = createAction(ARTICLE_FETCH_SUCCESS);
const fetchArticleFailure = createAction(ARTICLE_FETCH_FAILURE);

export const setCurrTab = createAction(CURR_TAB_SET);

export const loginUser = ({ email, password }) => dispatch => {
  dispatch({
    type: USER_LOGIN_REQUEST
  });
  return axios({
    url: "https://conduit.productionready.io/api/users/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      user: { email, password }
    }
  })
    .then(({ data }) => {
      localStorage.setItem("jwt_token", data.user.token);
      return dispatch(loginUserSuccess({ user: data.user }));
    })
    .catch(({ response }) => {
      return dispatch(loginUserFailure({ errors: response.data.errors }));
    });
};

export const logoutUser = () => {
  localStorage.removeItem("jwt_token");
  return { type: USER_LOGOUT_SUCCESS };
};

export const fetchUser = user => (dispatch, getState) => {
  const token = localStorage.getItem("jwt_token");
  if (!token) {
    console.log("JWT Token not found. Can not fetch user");
    return Promise.resolve();
  }
  if (getUsername(getState())) {
    console.log("User is allready in store. Skipping");
    return Promise.resolve();
  }
  return axios({
    url: "https://conduit.productionready.io/api/user",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
  })
    .then(({ data }) => {
      return dispatch(fetchUserSuccess({ user: data.user }));
    })
    .catch(error => console.log(error));
};

export const fetchArticles = (endpoint, params) => dispatch => {
  const headers = {
    "Content-Type": "application/json"
  };
  const token = localStorage.getItem("jwt_token");
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  return axios({
    url: `https://conduit.productionready.io${endpoint}`,
    headers,
    params
  }).then(({ data }) => {
    dispatch(fetchArticlesSuccess({ articles: data.articles }));
  });
};

export const publishArticle = ({
  title,
  description,
  body,
  tagList
}) => dispatch => {
  const headers = {
    "Content-Type": "application/json"
  };
  const token = localStorage.getItem("jwt_token");
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  dispatch(publishArticleRequest());
  return axios({
    url: "https://conduit.productionready.io/api/articles",
    method: "POST",
    headers,
    data: {
      article: {
        title,
        description,
        body,
        tagList
      }
    }
  }).then(({ data }) => {
    dispatch(publishArticleSuccess({ article: data.article }));
    return data.article;
  });
};

export const fetchArticle = slug => dispatch => {
  const headers = {
    "Content-Type": "application/json"
  };
  const token = localStorage.getItem("jwt_token");
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  dispatch(fetchArticleRequest());
  return axios({
    url: `https://conduit.productionready.io/api/articles/${slug}`,
    headers: headers
  }).then(({ data }) => {
    return dispatch(fetchArticleSuccess({ article: data.article }));
  });
};
