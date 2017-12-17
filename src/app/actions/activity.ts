import {Activity} from "../models/activity";
import {ActionWithPayload} from "../utils";

export const INDEX_REQUEST = '[ACTIVITY] Index Request';
export const INDEX_SUCCESS = '[ACTIVITY] Index Success';
export const CREATE_REQUEST = '[ACTIVITY] Create Request';
export const CREATE_SUCCESS = '[ACTIVITY] Create Success';
export const UPDATE_REQUEST = '[ACTIVITY] Update Request';
export const UPDATE_SUCCESS = '[ACTIVITY] Update Success';
export const DELETE_REQUEST = '[ACTIVITY] Delete Request';
export const DELETE_SUCCESS = '[ACTIVITY] Delete Success';

export class ActivityIndexRequestAction implements ActionWithPayload {
  readonly type = INDEX_REQUEST;
}

export class ActivityIndexSuccessAction implements ActionWithPayload {
  readonly type = INDEX_SUCCESS;

  constructor(public payload: Activity[]) {
  }
}

export class ActivityCreateRequest implements ActionWithPayload {
  readonly type = CREATE_REQUEST;
}

export class ActivityCreateSuccess implements ActionWithPayload {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: {data: Activity}) {
  }
}

export class ActivityUpdateRequestAction implements ActionWithPayload {
  readonly type = UPDATE_REQUEST;
}

export class ActivityUpdateSuccessAction implements ActionWithPayload {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: {data: Activity}) {
  }
}

export class ActivityDeleteRequestAction implements ActionWithPayload {
  readonly type = DELETE_REQUEST;
}

export class ActivityDeleteSuccessRequest implements ActionWithPayload {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: number) { }
}
