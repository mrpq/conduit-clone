import {
  LIKE_TOGGLE_REQUEST,
  LIKE_TOGGLE_SUCCESS,
  LIKE_TOGGLE_FAILURE
} from "../actions/constants";

const toggleLikeRequest = (state = { pending: false }, action) => {
  switch (action.type) {
    case LIKE_TOGGLE_REQUEST:
      return { pending: true };
    case LIKE_TOGGLE_SUCCESS:
      return { pending: false };
    case LIKE_TOGGLE_FAILURE:
      return { pending: false, errors: action.payload.errors };
    default:
      return state;
  }
};

export default toggleLikeRequest;

export const getIsToggleLikeRequestPending = state => {
  return state.pending;
};
