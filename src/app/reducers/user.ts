import {User} from "../models/user";

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
