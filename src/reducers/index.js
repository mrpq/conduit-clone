import * as fromArticles from "./articles";

export { default as articles } from "./articles";
export { default as auth } from "./auth";
export { default as currArticle } from "./currArticle";
export { default as currTab } from "./currTab";
export { default as user } from "./user";

export const getArticles = state => {
  return fromArticles.getArticles(state.articles);
};

export const getArticle = (state, slug) => {
  return fromArticles.getArticle(state.articles, slug);
};

export const getArticlesCount = state => {
  return fromArticles(state.articles);
};
