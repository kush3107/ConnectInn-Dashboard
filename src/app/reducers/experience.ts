import {Experience} from "../models/experience";
import {ActionWithPayload, Utils} from "../utils";
import {APP_STATE_RESET} from "../actions/index";
import {
  CREATE_REQUEST, CREATE_SUCCESS, DELETE_REQUEST, DELETE_SUCCESS, INDEX_REQUEST, INDEX_SUCCESS, UPDATE_REQUEST,
  UPDATE_SUCCESS
} from "../actions/experience";
import {createSelector} from "reselect";

export interface ExperienceState {
  ids: number[];
  entities: {
    [id: number]: Experience
  };
  loading: boolean;
  loaded: boolean;
}

export const initialState: ExperienceState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: ActionWithPayload): ExperienceState {
  switch (action.type) {
    case INDEX_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case INDEX_SUCCESS: {
      const experiences = action.payload;
      const obj = Utils.normalize(experiences);
      const ids = experiences.map(exp => exp.id);
      const entities = {...state.entities, ...obj};

      return {...state, ...{loading: false, loaded: true, entities: entities, ids: ids}};
    }
    case CREATE_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case CREATE_SUCCESS: {
      const experiences = action.payload;
      const id = experiences.id;
      const obj = {
        [id]: experiences
      };
      const entities = {...state.entities, ...obj};
      const ids = [...state.ids, ...id];

      return {...state, ...{ids: ids, entities: entities, loading: false, loaded: true}};
    }
    case UPDATE_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case UPDATE_SUCCESS:{
      const experiences = action.payload;
      const obj = {
        [experiences.id]: experiences
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

export const getIds = (state: ExperienceState) => state.ids;
export const getLoaded = (state: ExperienceState) => state.loaded;
export const getLoading = (state: ExperienceState) => state.loading;
export const getEntities = (state: ExperienceState) => state.entities;
export const getExperiences = createSelector(getIds, getEntities, (ids, entities) => ids.map(id => entities[id]));
