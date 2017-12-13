import {ActionWithPayload} from "../utils";
import {User} from "../models/user";

export const INDEX_REQUEST = '[FOLLOWERS] Index Request';
export const INDEX_SUCCESS = '[FOLLOWERS] Index Success';
export const CREATE_REQUEST = '[FOLLOWERS] Create Request';
export const CREATE_SUCCESS = '[FOLLOWERS] Create Success';
export const UPDATE_REQUEST = '[FOLLOWERS] Update Request';
export const UPDATE_SUCCESS = '[FOLLOWERS] Update Success';
export const DELETE_REQUEST = '[FOLLOWERS] Delete Request';
export const DELETE_SUCCESS = '[FOLLOWERS] Delete Success';


export class FollowerIndexRequestAction implements ActionWithPayload {
  readonly type = INDEX_REQUEST;
}

export class FollowerIndexSuccessAction implements ActionWithPayload {
  readonly type = INDEX_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class FollowerCreateRequest implements ActionWithPayload {
  readonly type = CREATE_REQUEST;
}

export class FollowerCreateSuccess implements ActionWithPayload {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: {data: User}) {
  }
}

export class FollowerUpdateRequestAction implements ActionWithPayload {
  readonly type = UPDATE_REQUEST;
}

export class FollowerUpdateSuccessAction implements ActionWithPayload {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: {data: User}) {
  }
}

export class FollowerDeleteRequestAction implements ActionWithPayload {
  readonly type = DELETE_REQUEST;
}

export class FollowerDeleteSuccessRequest implements ActionWithPayload {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: number) { }
}
