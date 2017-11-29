import {ActionWithPayload} from "../utils";
import {Education} from "../models/education";

export const INDEX_REQUEST = '[EDUCATION] Index Request';
export const INDEX_SUCCESS = '[EDUCATION] Index Success';
export const CREATE_REQUEST = '[EDUCATION] Create Request';
export const CREATE_SUCCESS = '[EDUCATION] Create Success';
export const UPDATE_REQUEST = '[EDUCATION] Update Request';
export const UPDATE_SUCCESS = '[EDUCATION] Update Success';
export const DELETE_REQUEST = '[EDUCATION] Delete Request';
export const DELETE_SUCCESS = '[EDUCATION] Delete Success';


export class EducationIndexRequestAction implements ActionWithPayload {
  readonly type = INDEX_REQUEST;
}

export class EducationIndexSuccessAction implements ActionWithPayload {
  readonly type = INDEX_SUCCESS;

  constructor(public payload: Education[]) {
  }
}

export class EducationCreateRequest implements ActionWithPayload {
  readonly type = CREATE_REQUEST;
}

export class EducationCreateSuccess implements ActionWithPayload {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: {data: Education}) {
  }
}

export class EducationUpdateRequestAction implements ActionWithPayload {
  readonly type = UPDATE_REQUEST;
}

export class EducationUpdateSuccessAction implements ActionWithPayload {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: {data: Education}) {
  }
}

export class EducationDeleteRequestAction implements ActionWithPayload {
  readonly type = DELETE_REQUEST;
}

export class EducationDeleteSuccessRequest implements ActionWithPayload {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: number) { }
}
