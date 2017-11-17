import {Action} from "@ngrx/store";
import {ActionWithPayload} from "../utils";

export const APP_LANDING_URL = '[App] landing_url';

export class SetLandingUrlAction implements ActionWithPayload {
  readonly type = APP_LANDING_URL;

  constructor(public payload: string) {
  }
}
