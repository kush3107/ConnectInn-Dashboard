import {Action} from '@ngrx/store';
import {User} from '../models/user';
import {ActionWithPayload} from "../utils";

export const LOGIN_REQUEST = '[USER] login request';
export const LOGIN_SUCCESS = '[USER] login successful';
export const USER_PROFILE_REQUEST = '[USER] Profile Request';
export const USER_PROFILE_SUCCESS = '[USER] Profile Success';
export const UPDATE_REQUEST = '[USER] update request';
export const UPDATE_SUCCESS = '[USER] update successful';


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoginRequestAction implements ActionWithPayload {
  readonly type = LOGIN_REQUEST;
}

export class LoginSuccessAction implements ActionWithPayload {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: User) {
  }
}

export class UserProfileRequestAction implements Action {
  readonly type = USER_PROFILE_REQUEST;
}

export class UserProfileSuccessAction implements Action {
  readonly type = USER_PROFILE_SUCCESS;

  constructor(public payload: User) {
  }
}

export class UpdateRequestAction implements ActionWithPayload {
  readonly type = UPDATE_REQUEST;
}

export class UpdateSuccessAction implements ActionWithPayload {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: User) {
  }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoginRequestAction
  | LoginSuccessAction
  | UpdateRequestAction
  | UpdateSuccessAction;
