import {Action} from "@ngrx/store";

export const APP_LANDING_URL = '[App] landing_url';

export class SetLandingUrlAction implements Action {
  readonly type = APP_LANDING_URL;

  constructor(public payload: string) {
  }
}
