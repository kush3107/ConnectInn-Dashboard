import {Action} from '@ngrx/store';
import {ActionWithPayload} from "../utils";

export const APP_STATE_RESET = '[App] reset';
export const APP_BOOTSTRAPPED = '[App] bootstrapped';

export class AppStateResetAction implements ActionWithPayload {
  readonly type = APP_STATE_RESET;
}

export class AppBootstrapSuccessAction implements ActionWithPayload {
  readonly type = APP_BOOTSTRAPPED;
}

export type Actions
  = AppStateResetAction
  | AppBootstrapSuccessAction;
