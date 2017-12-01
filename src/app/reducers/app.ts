import {APP_LANDING_URL} from "../actions/app";
import {APP_BOOTSTRAPPED, APP_STATE_RESET} from "../actions/index";
import {ActionWithPayload} from "../utils";
import {LOGIN_SUCCESS} from "../actions/user";
import {UPDATE_SUCCESS} from "../actions/activity";

export interface State {
  landing_url: string;
  landing_url_overridden: boolean;
  is_bootstrapped: boolean;
  isMenuHidden: boolean;
}

export const initialState: State = {
  landing_url: '/feed',
  landing_url_overridden: false,
  is_bootstrapped: false,
  isMenuHidden: false,
};

export function reducer(state = initialState, action: ActionWithPayload): State {
  switch (action.type) {
    case APP_LANDING_URL: {
      return Object.assign({}, state, {landing_url: action.payload, landing_url_overridden: true});
    }
    case APP_BOOTSTRAPPED: {
      return Object.assign({}, state, {is_bootstrapped: true});
    }
    case LOGIN_SUCCESS: {
      if (state.landing_url_overridden) {
        return state;
      }

      const user = action.payload;

      return Object.assign({}, state, {landing_url: '/feed'});
    }
    case UPDATE_SUCCESS: {
      if (state.landing_url_overridden) {
        return state;
      }

      const user = action.payload;

      return Object.assign({}, state, {landing_url: '/feed'});
    }
    case APP_STATE_RESET: {
      return {...initialState};
    }
    default: {
      return state;
    }
  }
}

export const getLandingUrl = (state: State) => state.landing_url;
