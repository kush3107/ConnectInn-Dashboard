import {Activity} from "../models/activity";

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
