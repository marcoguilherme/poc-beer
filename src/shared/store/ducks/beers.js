import { createActions, createReducer } from 'reduxsauce';

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  buildMenuRequest: [],
  buildMenuSuccess: ['payload'],
  buildMenuFailure: ['error'],
});

/**
 * Handlers
 */
const INITIAL_STATE = {
  data: [],
  loaded: false,
  loading: false,
  error: null,
};

const Request = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
});

const Success = (state = INITIAL_STATE, action) => ({
  ...state,
  data: action.payload,
  loaded: true,
  loading: false,
});

const Failure = (state = INITIAL_STATE, action) => ({
  ...state,
  error: action.error,
  loaded: true,
  loading: false,
});

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.BUILD_MENU_REQUEST]: Request,
  [Types.BUILD_MENU_SUCCESS]: Success,
  [Types.BUILD_MENU_FAILURE]: Failure,
});
