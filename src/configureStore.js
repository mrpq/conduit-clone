import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import { routerReducer } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import { auth, user, articles, currArticle } from "./reducers";
import currTab from "./reducers/currTab";

export const history = createHistory();
// history.listen(location => console.log(location));
const rootReducer = combineReducers({
  auth,
  user,
  articles,
  currArticle,
  currTab,
  router: routerReducer
});

const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, routerMiddleware(history), logger)
  );
};

export default configureStore;
