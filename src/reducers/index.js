import * as fromArticles from "./articles";
import * as fromComments from "./comments";
import * as fromAuth from "./auth";
import * as fromUser from "./user";
import * as fromCurrArticle from "./currArticle";
import * as fromCurrTab from "./currTab";
import * as fromTags from "./tags";
import * as fromCurrProfile from "./currProfile";
import * as fromToggleLikeRequest from "./toggleLikeRequest";
import * as fromCommentDeleteRequest from "./commentDeleteRequest";

export { default as articles } from "./articles";
export { default as comments } from "./comments";
export { default as auth } from "./auth";
export { default as currArticle } from "./currArticle";
export { default as currTab } from "./currTab";
export { default as user } from "./user";
export { default as tags } from "./tags";
export { default as currProfile } from "./currProfile";
export { default as toggleLikeRequest } from "./toggleLikeRequest";
export { default as commentDeleteRequest } from "./commentDeleteRequest";

export const getArticles = state => {
  return fromArticles.getArticles(state.articles);
};

export const getComments = state => {
  return fromComments.getComments(state.comments);
};

export const getArticle = (state, slug) => {
  return fromArticles.getArticle(state.articles, slug);
};

export const getArticlesCount = state => {
  return fromArticles.getArticlesCount(state.articles);
};

export const getIsArticlesFetching = state => {
  return fromArticles.getIsArticlesFetching(state.articles);
};

export const getFetchArticlesErrors = state => {
  return fromArticles.getErrors(state.articles);
};

export const getIsAuthenticated = state => {
  return fromAuth.getIsAuthenticated(state.auth);
};

export const getAuthErrors = state => {
  return fromAuth.getErrors(state.auth);
};

export const getCurrArticle = state => {
  return fromCurrArticle.getCurrArticle(state.currArticle);
};
export const getIsCurrArticleFetching = state => {
  return fromCurrArticle.getIsCurrArticleFetching(state.currArticle);
};

export const getUsername = state => {
  return fromUser.getUsername(state.user);
};
export const getIsUserUpdated = state => {
  return fromUser.getIsUserUpdated(state.user);
};

export const getCurrTab = state => {
  return fromCurrTab.getCurrTab(state.currTab);
};

export const getTags = state => {
  return fromTags.getTags(state.tags);
};

export const getCurrProfile = state => {
  return fromCurrProfile.getCurrProfile(state.currProfile);
};
export const getIsCurrProfileFetching = state => {
  return fromCurrProfile.getIsCurrProfileFetching(state.currProfile);
};

export const getIsToggleLikeRequestPending = state => {
  return fromToggleLikeRequest.getIsToggleLikeRequestPending(
    state.toggleLikeRequest
  );
};

export const getCurrArticleErrors = state => {
  return fromCurrArticle.getCurrArticleErrors(state.currArticle);
};
export const getArticleIsPublishing = state => {
  return fromCurrArticle.getArticleIsPublishing(state.currArticle);
};

export const getIsCommentDeleteRequestPending = state => {
  return fromCommentDeleteRequest.getIsCommentDeleteRequestPending(
    state.commentDeleteRequest
  );
};
