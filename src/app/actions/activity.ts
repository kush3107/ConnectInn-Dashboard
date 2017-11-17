import {Action} from "@ngrx/store";
import {Activity} from "../models/activity";
import {ActionWithPayload} from "../utils";

export const INDEX_REQUEST = '[ACTIVITY] Index Request';
export const INDEX_SUCCESS = '[ACTIVITY] Index Success';
export const UPDATE_REQUEST = '[ACTIVITY] Update Request';
export const UPDATE_SUCCESS = '[ACTIVITY] Update Success';

export class ActivityIndexRequestAction implements ActionWithPayload {
  readonly type = INDEX_REQUEST;
}

export class ActivityIndexSuccessAction implements ActionWithPayload {
  readonly type = INDEX_SUCCESS;

  constructor(public payload: Activity[]) {
  }
}

export class ActivityUpdateRequestAction implements ActionWithPayload {
  readonly type = UPDATE_REQUEST;
}

export class ActivityUpdateSuccessAction implements ActionWithPayload {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: {Activity: Activity, thread_id: number}) {
  }
}
