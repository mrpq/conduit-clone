import {
  TAG_FETCH_REQUEST,
  TAG_FETCH_SUCCESS,
  TAG_FETCH_FAILURE
} from "../actions/constants";

const tags = (state = { isFetching: true }, action) => {
  switch (action.type) {
    case TAG_FETCH_REQUEST:
      return { ...state, isFetching: true };
    case TAG_FETCH_SUCCESS:
      return { tags: action.payload.tags, isFetching: false };
    case TAG_FETCH_FAILURE:
      return { ...state, isFetching: false, errors: action.payload.errors };
    default:
      return state;
  }
};

export default tags;

export const getTags = state => {
  return state;
};
