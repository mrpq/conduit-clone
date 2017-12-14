import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import { routerReducer } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import { auth, user, articles, currArticle, currTab, tags } from "./reducers/";

export const history = createHistory();
const rootReducer = combineReducers({
  auth,
  user,
  articles,
  currArticle,
  currTab,
  tags,
  router: routerReducer
});

const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, routerMiddleware(history), logger)
  );
};

export default configureStore;
