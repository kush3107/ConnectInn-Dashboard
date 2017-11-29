import {Education} from "../models/education";
import {ActionWithPayload, Utils} from "../utils";
import {APP_STATE_RESET} from "../actions/index";
import {
  CREATE_REQUEST, CREATE_SUCCESS, INDEX_REQUEST, INDEX_SUCCESS, UPDATE_REQUEST, UPDATE_SUCCESS
} from "../actions/education";
import {createSelector} from "reselect";

export interface EducationState {
  ids: number[];
  entities: {
    [id: number]: Education
  };
  loading: boolean;
  loaded: boolean;
}

export const initialState: EducationState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: ActionWithPayload): EducationState {
  switch (action.type) {
    case INDEX_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case INDEX_SUCCESS: {
      const educations = action.payload;
      const obj = Utils.normalize(educations);
      const ids = educations.map(education => education.id);
      const entities = {...state.entities, ...obj};

      return {...state, ...{loading: false, loaded: true, entities: entities, ids: ids}};
    }
    case CREATE_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case CREATE_SUCCESS: {
      const education = action.payload;
      const id = education.id;
      const obj = {
        [id]: education
      };
      const entities = {...state.entities, ...obj};
      const ids = [...state.ids, ...id];

      return {...state, ...{ids: ids, entities: entities, loading: false, loaded: true}};
    }
    case UPDATE_REQUEST: {
      return {...state, ...{loading: true}};
    }
    case UPDATE_SUCCESS:{
      const education = action.payload;
      const obj = {
        [education.id]: education
      };
      const entities = {...state.entities, ...obj};

      return {...state, ...{entities: entities, loading: false, loaded: true}};

    }
    case APP_STATE_RESET: {
      return {...initialState};
    }
    default: {
      return state;
    }
  }
}

export const getIds = (state: EducationState) => state.ids;
export const getLoaded = (state: EducationState) => state.loaded;
export const getLoading = (state: EducationState) => state.loading;
export const getEntities = (state: EducationState) => state.entities;
export const getEducations = createSelector(getIds, getEntities, (ids, entities) => ids.map(id => entities[id]));
