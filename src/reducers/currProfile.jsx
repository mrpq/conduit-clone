import { combineReducers } from "redux";

import {
  PROFILE_FETCH_REQUEST,
  PROFILE_FETCH_SUCCESS,
  PROFILE_FETCH_FAILURE
} from "../actions/constants";

const profile = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_FETCH_SUCCESS:
      return action.payload.profile;
    default:
      return state;
  }
};
const isFetching = (state = true, action) => {
  switch (action.type) {
    case PROFILE_FETCH_REQUEST:
      return true;
    case PROFILE_FETCH_SUCCESS:
    case PROFILE_FETCH_FAILURE:
      return false;
    default:
      return state;
  }
};

const currProfile = combineReducers({ profile, isFetching });

export default currProfile;

export const getCurrProfile = state => {
  return state.profile;
};
export const getIsCurrProfileFetching = state => {
  return state.isFetching;
};
