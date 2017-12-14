import { combineReducers } from "redux";

import { CURR_TAB_SET, PAGE_SET } from "../actions/constants";

const currTab_ = {
  type: "user", //feed, global, favourite
  user: {}, // {author: jake}, {favourited: jake},
  pagination: {
    limit: 20,
    page: 0
  }
};

const type = (state = "global", action) => {
  switch (action.type) {
    case CURR_TAB_SET:
      return action.payload.type;
    default:
      return state;
  }
};
const user = (state = "", action) => {
  switch (action.type) {
    case CURR_TAB_SET:
      return action.payload.user || "";
    default:
      return state;
  }
};
const pagination = (state = { limit: 10, page: 0 }, action) => {
  switch (action.type) {
    case PAGE_SET:
      return { ...state, page: action.payload.page };
    default:
      return state;
  }
};

const tag = (state = "", action) => {
  switch (action.type) {
    case CURR_TAB_SET:
      return action.payload.tag || "";
    default:
      return state;
  }
};

const currTab = combineReducers({
  type,
  user,
  pagination
});

export default currTab;

export const getCurrTab = state => {
  return state;
};
