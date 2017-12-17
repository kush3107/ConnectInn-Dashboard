import {Activity} from "../models/activity";
import {
  CREATE_REQUEST, CREATE_SUCCESS, DELETE_REQUEST, DELETE_SUCCESS, INDEX_REQUEST, INDEX_SUCCESS, UPDATE_REQUEST,
  UPDATE_SUCCESS
} from "../actions/activity";
import {ActionWithPayload, Utils} from "../utils";
import {APP_STATE_RESET} from "../actions/index";
import {createSelector} from "reselect";

export interface State {
  ids: number[];
  entities: { [id: number]: Activity };
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  ids: [], entities: {}, loading: false, loaded: false
};

export function reducer(state = initialState, action: ActionWithPayload): State {
  switch (action.type) {
    case INDEX_REQUEST: {
      return {...state, ...{loading: true}};
    }

    case INDEX_SUCCESS: {
      const activities = action.payload;
      const activitiesIds = activities.map(activity => activity.id);
      const entities = Utils.normalize(activities);
      return {...state, ...{ids: activitiesIds, entities: entities, loading: false, loaded: true}};
    }

    case CREATE_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case CREATE_SUCCESS: {
      const activity = action.payload;
      const id = activity.id;
      const obj = {
        [id]: activity
      };
      const entities = {...state.entities, ...obj};
      const ids = [...state.ids, ...id];

      return {...state, ...{ids: ids, entities: entities, loading: false, loaded: true}};
    }

    case UPDATE_REQUEST: {
      return Object.assign({}, state, {loading: true});
    }

    case UPDATE_SUCCESS: {
      const activity = action.payload;
      const newActivityId = activity.id;

      return {
        ...state, entities: {
          ...state.entities, [newActivityId]: activity
        }, loading: false, loaded: true
      };
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

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getActivities = createSelector(getIds, getEntities, (ids, entities) => ids.map((id) => entities[id]));
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
