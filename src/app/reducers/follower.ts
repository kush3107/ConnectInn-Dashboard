import {Education} from "../models/education";
import {ActionWithPayload, Utils} from "../utils";
import {APP_STATE_RESET} from "../actions/index";
import {createSelector} from "reselect";
import {
  CREATE_REQUEST, CREATE_SUCCESS, DELETE_REQUEST, DELETE_SUCCESS, INDEX_REQUEST, INDEX_SUCCESS, UPDATE_REQUEST,
  UPDATE_SUCCESS
} from "../actions/follower";

export interface FollowerState {
  ids: number[];
  entities: {
    [id: number]: User
  };
  loading: boolean;
  loaded: boolean;
}

export const initialState: FollowerState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: ActionWithPayload): FollowerState {
  switch (action.type) {
    case INDEX_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case INDEX_SUCCESS: {
      const followers = action.payload;
      const obj = Utils.normalize(followers);
      const ids = followers.map(follower => follower.id);
      const entities = {...state.entities, ...obj};

      return {...state, ...{loading: false, loaded: true, entities: entities, ids: ids}};
    }
    case CREATE_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case CREATE_SUCCESS: {
      const follower = action.payload;
      const id = follower.id;
      const obj = {
        [id]: follower
      };
      const entities = {...state.entities, ...obj};
      const ids = [...state.ids, ...id];

      return {...state, ...{ids: ids, entities: entities, loading: false, loaded: true}};
    }
    case UPDATE_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case UPDATE_SUCCESS:{
      const follower = action.payload;
      const obj = {
        [follower.id]: follower
      };
      const entities = {...state.entities, ...obj};

      return {...state, ...{entities: entities, loading: false, loaded: true}};

    }
    case DELETE_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case DELETE_SUCCESS: {
      const id = action.payload;
      const newIds = state.ids.filter(el => el !== id);
      const newEntities = Utils.removeKey(state.entities, id);

      return {...state, ...{entities: newEntities, ids: newIds, loading: false, loaded: true}};
    }
    case APP_STATE_RESET: {
      return {...initialState};
    }
    default: {
      return state;
    }
  }
}

export const getIds = (state: FollowerState) => state.ids;
export const getLoaded = (state: FollowerState) => state.loaded;
export const getLoading = (state: FollowerState) => state.loading;
export const getEntities = (state: FollowerState) => state.entities;
export const getFollowers = createSelector(getIds, getEntities, (ids, entities) => ids.map(id => entities[id]));
