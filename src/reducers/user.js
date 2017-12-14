import {
  USER_LOGIN_SUCCESS,
  USER_FETCH_SUCCESS,
  USER_LOGOUT_SUCCESS
} from "../actions/constants";

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
    case USER_FETCH_SUCCESS:
      return action.payload.user;
    case USER_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
export default user;

export const getUsername = state => {
  return state.username;
};
