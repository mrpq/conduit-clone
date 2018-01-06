import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  AUTH_ERRORS_CLEAR
} from "../actions/constants";

const auth = (
  state = {
    isAuthenticated: localStorage.getItem("jwt_token") ? true : false,
    isFetching: false,
    errors: null
  },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST: {
      return { isAuthenticated: false, isFetching: true };
    }
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { isAuthenticated: true, isFetching: false };
    case USER_LOGIN_FAILURE:
    case USER_REGISTER_FAILURE:
      const errors = action.payload.errors;
      return { ...state, isFetching: false, errors };
    case USER_LOGOUT_SUCCESS:
      return { isAuthenticated: false, isFetching: false };
    case AUTH_ERRORS_CLEAR:
      return { ...state, errors: null };
    default:
      return state;
  }
};
export default auth;

export const getIsAuthenticated = state => {
  return state.isAuthenticated;
};

export const getErrors = state => {
  return state.errors;
};
