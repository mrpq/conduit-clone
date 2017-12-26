import {
  USER_LOGIN_SUCCESS,
  USER_FETCH_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET
} from "../actions/constants";

const user = (state = { isUpdated: false }, action) => {
  switch (action.type) {
    // case USER_LOGIN_SUCCESS:
    // case USER_FETCH_SUCCESS:
    //   return action.payload.user;
    // case USER_LOGOUT_SUCCESS:
    //   return {isUpdated: false};
    case USER_UPDATE_SUCCESS: {
      return { isUpdated: true };
    }
    case USER_UPDATE_REQUEST:
    case USER_UPDATE_RESET:
      return { isUpdated: false };
    default:
      return state;
  }
};
export default user;

export const getUsername = state => {
  return state.username;
};
export const getIsUserUpdated = state => {
  return state.isUpdated;
};
