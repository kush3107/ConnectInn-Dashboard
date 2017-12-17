import {ActionWithPayload} from "../utils";
import {Experience} from "../models/experience";

export const INDEX_REQUEST = '[EXPERIENCE] Index Request';
export const INDEX_SUCCESS = '[EXPERIENCE] Index Success';
export const CREATE_REQUEST = '[EXPERIENCE] Create Request';
export const CREATE_SUCCESS = '[EXPERIENCE] Create Success';
export const UPDATE_REQUEST = '[EXPERIENCE] Update Request';
export const UPDATE_SUCCESS = '[EXPERIENCE] Update Success';
export const DELETE_REQUEST = '[EXPERIENCE] Delete Request';
export const DELETE_SUCCESS = '[EXPERIENCE] Delete Success';


export class ExperienceIndexRequestAction implements ActionWithPayload {
  readonly type = INDEX_REQUEST;
}

export class ExperienceIndexSuccessAction implements ActionWithPayload {
  readonly type = INDEX_SUCCESS;

  constructor(public payload: Experience[]) {
  }
}

export class ExperienceCreateRequest implements ActionWithPayload {
  readonly type = CREATE_REQUEST;
}

export class ExperienceCreateSuccess implements ActionWithPayload {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: {data: Experience}) {
  }
}

export class ExperienceUpdateRequestAction implements ActionWithPayload {
  readonly type = UPDATE_REQUEST;
}

export class ExperienceUpdateSuccessAction implements ActionWithPayload {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: {data: Experience}) {
  }
}

export class ExperienceDeleteRequestAction implements ActionWithPayload {
  readonly type = DELETE_REQUEST;
}

export class ExperienceDeleteSuccessRequest implements ActionWithPayload {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: number) { }
}
