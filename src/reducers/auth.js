import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS
} from "../actions/constants";

const auth = (
  state = {
    isAuthenticated: localStorage.getItem("jwt_token") ? true : false,
    isFetching: false
  },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return { isAuthenticated: false, isFetching: true };
    }
    case USER_LOGIN_SUCCESS:
      return { isAuthenticated: true, isFetching: false };
    case USER_LOGIN_FAILURE:
      const errors = action.payload.errors;
      return { ...state, isFetching: false, errors };
    case USER_LOGOUT_SUCCESS:
      return { isAuthenticated: false, isFetching: false };
    default:
      return state;
  }
};
export default auth;

export const getIsAuthenticated = state => {
  return state.isAuthenticated;
};
