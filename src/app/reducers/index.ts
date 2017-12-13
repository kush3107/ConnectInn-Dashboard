/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromUser from './user';
import * as fromActivity from './activity';
import * as fromApp from './app';
import * as fromEducation from './education';
import * as fromFollower from './follower';
import {createSelector} from "reselect";
import {ActionReducerMap} from "@ngrx/store";

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  user: fromUser.State;
  activity: fromActivity.State;
  app: fromApp.State;
  education: fromEducation.EducationState,
  follower: fromFollower.FollowerState
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  activity: fromActivity.reducer,
  app: fromApp.reducer,
  education: fromEducation.reducer,
  follower: fromFollower.reducer
};



export const getAppState = (state: State) => state.app;
export const getUserState = (state: State) => state.user;
export const getActivityState = (state: State) => state.activity;
export const getEducationState = (state: State) => state.education;
export const getFollowerState = (state: State) => state.follower;

/**
 * All the selectors from app state
 */
export const getAppLandingUrl = createSelector(getAppState, fromApp.getLandingUrl);

/**
 * All the selectors from user state
 */
export const getUser = createSelector(getUserState, fromUser.getUser);
export const isLoggingIn = createSelector(getUserState, fromUser.isLoggingIn);
export const isLoggedIn = createSelector(getUserState, fromUser.isLoggedIn);
export const isUserUpdating = createSelector(getUserState, fromUser.isUpdating);

// Activity Related selectors from activity state
export const getMyActivities = createSelector(getActivityState, fromActivity.getActivities);
export const getMyActivitiesLoading = createSelector(getActivityState, fromActivity.getLoading);
export const getMyActivitiesLoaded = createSelector(getActivityState, fromActivity.getLoaded);


// Education Related
export const getEducationIds = createSelector(getEducationState, fromEducation.getIds);
export const getEducationEntities = createSelector(getEducationState, fromEducation.getEntities);
export const getEducations = createSelector(getEducationState, fromEducation.getEducations);
export const getEducationsLoaded = createSelector(getEducationState, fromEducation.getLoaded);
export const getEducationsLoading = createSelector(getEducationState, fromEducation.getLoading);

// Followers Related
export const getFollowerIds = createSelector(getFollowerState, fromFollower.getIds);
export const getFollowerEntities = createSelector(getFollowerState, fromFollower.getEntities);
export const getFollowers = createSelector(getFollowerState, fromFollower.getFollowers);
export const getFollowerLoaded = createSelector(getFollowerState, fromFollower.getLoaded);
export const getFollowerLoading = createSelector(getFollowerState, fromFollower.getLoading);
