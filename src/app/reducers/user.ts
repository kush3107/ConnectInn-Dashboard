import {User} from "../models/user";
import {LOGIN_REQUEST, LOGIN_SUCCESS, UPDATE_REQUEST, UPDATE_SUCCESS} from "../actions/user";
import {ActionWithPayload} from "../utils";
import {APP_STATE_RESET} from "../actions/index";

export interface State {
  user: User;
  loggedIn: boolean;
  loggingIn: boolean;
  updating: boolean;
}

export const initialState: State = {
  user: null,
  loggedIn: false,
  loggingIn: false,
  updating: false
};

export function reducer(state = initialState, action: ActionWithPayload): State {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return Object.assign({}, state, {loggingIn: true});
    }
    case LOGIN_SUCCESS: {
      return Object.assign({}, state, {user: action.payload, loggedIn: true, loggingIn: false});
    }
    case UPDATE_REQUEST: {
      return Object.assign({}, state, {updating: true});
    }
    case UPDATE_SUCCESS: {
      return Object.assign({}, state, {user: action.payload, updating: false, loggedIn: true});
    }
    case APP_STATE_RESET: {
      return {...state, ...{user: null, loggedIn: false, loggingIn: false}};
    }
    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;

export const isLoggedIn = (state: State) => {
  console.log(state);
  return state.loggedIn;
};
export const isLoggingIn = (state: State) => state.loggingIn;
export const isUpdating = (state: State) => state.updating;

