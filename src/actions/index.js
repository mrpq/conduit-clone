import { createAction } from "redux-actions";
import axios from "axios";
import { push } from "react-router-redux";

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
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
  ARTICLE_DELETE_REQUEST,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DELETE_FAILURE,
  CURR_TAB_SET,
  CURR_PROFILE_SET,
  PAGE_SET,
  TAG_FETCH_REQUEST,
  TAG_FETCH_SUCCESS,
  TAG_FETCH_FAILURE,
  LIKE_TOGGLE_REQUEST,
  LIKE_TOGGLE_SUCCESS,
  LIKE_TOGGLE_FAILURE,
  AUTH_ERRORS_CLEAR,
  EDITOR_ERRORS_CLEAR,
  COMMENTS_FETCH_FAILURE,
  COMMENTS_FETCH_SUCCESS,
  COMMENTS_FETCH_REQUEST,
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
  COMMENT_POST_FAILURE,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILURE
} from "./constants";
import { getIsAuthenticated } from "../reducers/";

export const loginUserSuccess = createAction(USER_LOGIN_SUCCESS);
export const loginUserFailure = createAction(USER_LOGIN_FAILURE);

const registerUserRequest = createAction(USER_REGISTER_REQUEST);
const registerUserSuccess = createAction(USER_REGISTER_SUCCESS);
const registerUserFailure = createAction(USER_REGISTER_FAILURE);

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

const deleteArticlesRequest = createAction(ARTICLE_DELETE_REQUEST);
const deleteArticlesSuccess = createAction(ARTICLE_DELETE_SUCCESS);
const deleteArticlesFailure = createAction(ARTICLE_DELETE_FAILURE);

const fetchCommentsRequest = createAction(COMMENTS_FETCH_REQUEST);
const fetchCommentsSuccess = createAction(COMMENTS_FETCH_SUCCESS);
const fetchCommentsFailure = createAction(COMMENTS_FETCH_FAILURE);

const deleteCommentRequest = createAction(COMMENT_DELETE_REQUEST);
const deleteCommentSuccess = createAction(COMMENT_DELETE_SUCCESS);
const deleteCommentFailure = createAction(COMMENT_DELETE_FAILURE);

const postCommentRequest = createAction(COMMENT_POST_REQUEST);
const postCommentSuccess = createAction(COMMENT_POST_SUCCESS);
const postCommentFailure = createAction(COMMENT_POST_FAILURE);

const publishArticleRequest = createAction(ARTICLE_PUBLISH_REQUEST);
const publishArticleSuccess = createAction(ARTICLE_PUBLISH_SUCCESS);
const publishArticleFailure = createAction(ARTICLE_PUBLISH_FAILURE);

const fetchArticleRequest = createAction(ARTICLE_FETCH_REQUEST);
const fetchArticleSuccess = createAction(ARTICLE_FETCH_SUCCESS);
const fetchArticleFailure = createAction(ARTICLE_FETCH_FAILURE);

export const setCurrTab = createAction(CURR_TAB_SET);
export const setCurrProfile = createAction(CURR_PROFILE_SET);
export const setPage = createAction(PAGE_SET);

export const fetchTagsRequest = createAction(TAG_FETCH_REQUEST);
export const fetchTagsSuccess = createAction(TAG_FETCH_SUCCESS);
export const fetchTagsFailure = createAction(TAG_FETCH_FAILURE);

export const toggleLikeRequest = createAction(LIKE_TOGGLE_REQUEST);
export const toggleLikeSuccess = createAction(LIKE_TOGGLE_SUCCESS);
export const toggleLikeFailure = createAction(LIKE_TOGGLE_FAILURE);

export const clearAuthErrors = createAction(AUTH_ERRORS_CLEAR);
export const clearEditorErrors = createAction(EDITOR_ERRORS_CLEAR);

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

export const registerUser = user => dispatch => {
  dispatch(registerUserRequest());
  return requestAPI("/api/users", {
    method: "POST",
    data: {
      user
    }
  })
    .then(({ data }) => {
      localStorage.setItem("jwt_token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return dispatch(registerUserSuccess({ user: data.user }));
    })
    .catch(({ response }) => {
      return dispatch(registerUserFailure({ errors: response.data.errors }));
    });
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
  requestAPIWithAuthToken("/api/articles", {
    method: "POST",
    data: { article }
  })
    .then(
      ({ data }) => {
        dispatch(publishArticleSuccess({ article: data.article }));
        return data.article;
      },
      ({ response }) => {
        dispatch(publishArticleFailure({ errors: response.data.errors }));
        return Promise.reject();
      }
    )
    .then(({ slug }) => dispatch(push(`/article/${slug}`)), () => {});
};

export const deleteArticle = slug => dispatch => {
  dispatch(deleteArticlesRequest());
  return requestAPIWithAuthToken(`/api/articles/${slug}`, { method: "DELETE" })
    .then(
      ({ data }) => {
        return dispatch(deleteArticlesSuccess());
      },
      ({ response }) => {
        dispatch(deleteArticlesFailure());
        return Promise.reject();
      }
    )
    .then(() => dispatch(push("/")));
};

export const fetchArticle = slug => dispatch => {
  dispatch(fetchArticleRequest());
  return requestAPI(`/api/articles/${slug}`).then(({ data }) => {
    dispatch(fetchArticleSuccess({ article: data.article }));
    return data.article;
  });
};

export const fetchTags = () => dispatch => {
  dispatch(fetchTagsRequest());
  return requestAPI("/api/tags").then(({ data }) => {
    return dispatch(fetchTagsSuccess({ tags: data.tags }));
  });
};

export const fetchProfile = username => dispatch => {
  dispatch(fetchProfileRequest());
  return requestAPIWithAuthToken(`/api/profiles/${username}`).then(
    ({ data }) => {
      return dispatch(fetchProfileSuccess({ profile: data.profile }));
    }
  );
};

export const followProfile = (username, follow = true) => (
  dispatch,
  getState
) => {
  const isAuthenticated = getIsAuthenticated(getState());
  if (!isAuthenticated) return dispatch(push("/login"));
  dispatch(followProfileRequest());
  return requestAPIWithAuthToken(`/api/profiles/${username}/follow`, {
    method: follow ? "POST" : "DELETE"
  }).then(({ data }) => {
    return dispatch(followProfileSuccess({ profile: data.profile }));
  });
};

export const toggleLike = (slug, favourited) => dispatch => {
  dispatch(toggleLikeRequest());
  return requestAPIWithAuthToken(`/api/articles/${slug}/favorite`, {
    method: favourited ? "DELETE" : "POST"
  }).then(({ data }) => dispatch(toggleLikeSuccess({ article: data.article })));
};

export const fetchComments = slug => dispatch => {
  dispatch(fetchCommentsRequest());
  return requestAPI(`/api/articles/${slug}/comments`).then(
    ({ data }) => dispatch(fetchCommentsSuccess({ comments: data.comments })),
    ({ response }) => {
      dispatch(fetchCommentsFailure({ errors: response.data.errors }));
      return Promise.reject();
    }
  );
};

export const postComment = (slug, comment) => dispatch => {
  dispatch(postCommentRequest());
  return requestAPIWithAuthToken(`/api/articles/${slug}/comments/`, {
    method: "POST",
    data: { comment: { body: comment } }
  }).then(
    ({ data }) => dispatch(postCommentSuccess({ comment: data.comment })),
    () => {
      dispatch(postCommentFailure());
      return Promise.reject();
    }
  );
};

export const deleteComment = (slug, id) => dispatch => {
  dispatch(deleteCommentRequest());
  return requestAPIWithAuthToken(`/api/articles/${slug}/comments/${id}`, {
    method: "DELETE"
  }).then(
    response => dispatch(deleteCommentSuccess({ id })),
    () => {
      dispatch(deleteCommentFailure());
      return Promise.reject();
    }
  );
};
