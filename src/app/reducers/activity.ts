import {Activity} from "../models/activity";
import {
  ActivityIndexRequestAction, INDEX_REQUEST, INDEX_SUCCESS, UPDATE_REQUEST, UPDATE_SUCCESS
} from "../actions/activity";
import {ActionWithPayload, Utils} from "../utils";

export interface State {
  ids: number[];
  entities: { [id: number]: Activity };
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: ActionWithPayload): State {
  switch (action.type) {
    case INDEX_REQUEST: {
      return Object.assign({}, state, {loading: true});
    }

    case INDEX_SUCCESS: {
      const activities = action.payload;
      const activitiesIds = activities.map(activity => activity.id);
      const entities = Utils.normalize(activities);
      return Object.assign({}, state, {
        ids: activitiesIds,
        loading: false,
        loaded: true,
        entities: entities
      });
    }

    case UPDATE_REQUEST: {
      return Object.assign({}, state, {loading: true});
    }

    case UPDATE_SUCCESS: {
      const activity = action.payload;
      const newActivityId = activity.id;

      return {
        ...state,
        entities: {
          ...state.entities,
          [newActivityId]: activity
        }
      };
    }

    default: {
      return state;
    }
  }
}
