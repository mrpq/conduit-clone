import { combineReducers } from "redux";

import {
  PROFILE_FETCH_REQUEST,
  PROFILE_FETCH_SUCCESS,
  PROFILE_FETCH_FAILURE,
  PROFILE_FOLLOW_REQUEST,
  PROFILE_FOLLOW_SUCCESS,
  PROFILE_FOLLOW_FAILURE,
  CURR_PROFILE_SET
} from "../actions/constants";

const profile = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_FETCH_SUCCESS:
    case PROFILE_FOLLOW_SUCCESS:
    case CURR_PROFILE_SET:
      return action.payload.profile;
    default:
      return state;
  }
};
const isFetching = (state = true, action) => {
  switch (action.type) {
    case PROFILE_FETCH_REQUEST:
    case PROFILE_FOLLOW_REQUEST:
      return true;
    case PROFILE_FOLLOW_SUCCESS:
    case PROFILE_FOLLOW_FAILURE:
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
