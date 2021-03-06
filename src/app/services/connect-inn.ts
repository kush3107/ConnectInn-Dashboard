import {Http, RequestOptions, Headers} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Utils} from "../utils";
import {MatSnackBar} from "@angular/material";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {Store} from "@ngrx/store";
import {State} from "../reducers/index";
import {
  LoginRequestAction,
  LoginSuccessAction,
  UpdateRequestAction,
  UpdateSuccessAction,
  UserProfileRequestAction,
  UserProfileSuccessAction
} from "../actions/user";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Router} from "@angular/router";
import {AppStateResetAction} from "../actions/index";
import {
  ActivityCreateRequest, ActivityCreateSuccess, ActivityDeleteRequestAction, ActivityDeleteSuccessRequest,
  ActivityIndexRequestAction, ActivityIndexSuccessAction, ActivityUpdateRequestAction, ActivityUpdateSuccessAction
} from "../actions/activity";
import {Activity} from "../models/activity";
import {
  EducationCreateRequest,
  EducationCreateSuccess,
  EducationDeleteRequestAction,
  EducationDeleteSuccessRequest,
  EducationIndexRequestAction,
  EducationIndexSuccessAction,
  EducationUpdateRequestAction,
  EducationUpdateSuccessAction
} from "../actions/education";
import {Education} from "../models/education";
import {
  FollowerDeleteRequestAction, FollowerDeleteSuccessRequest, FollowerIndexRequestAction, FollowerIndexSuccessAction
} from "../actions/follower";
import {Experience} from "../models/experience";
import {
  ExperienceCreateRequest, ExperienceCreateSuccess, ExperienceDeleteRequestAction, ExperienceDeleteSuccessRequest,
  ExperienceIndexRequestAction, ExperienceIndexSuccessAction, ExperienceUpdateRequestAction,
  ExperienceUpdateSuccessAction
} from "../actions/experience";

@Injectable()
export class ConnectInnService {
  private BASE_URL = environment.apiBaseURL;

  static hasLoginToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  constructor(private http: Http, private httpClient: HttpClient, private snackBar: MatSnackBar, private store: Store<State>, private router: Router) {
  }

  private get(url: string, data?: any) {

    const options = this.buildRequestOptions();

    if (data) {
      options.params = Utils.objToSearchParams(data);
    }

    return this.http.get(this.BASE_URL + url, options);
  }

  private post(url: string, data?: any) {

    const options = this.buildRequestOptions();

    return this.http.post(this.BASE_URL + url, data, options);
  }

  private put(url: string, data?: any) {

    const options = this.buildRequestOptions();

    return this.http.put(this.BASE_URL + url, data, options);
  }

  private delete(url: string, data?: any) {

    const options = this.buildRequestOptions();
    if (data) {
      options.params = Utils.objToSearchParams(data);
    }

    return this.http.delete(this.BASE_URL + url, options);
  }

  private buildRequestOptions(): RequestOptions {
    const options = new RequestOptions({headers: new Headers()});

    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      options.headers.append('Authorization', 'bearer ' + authToken);
    }

    return options;
  }

  private handleError(error: Response) {

    if (error.status === 401) {
      this.router.navigate(['/logout']);
      throw {message: 'Unauthorized access!', error: null};
    }

    const errorResponse = error.json()['errors'];
    const messageRes = error.json()['message'];
    const errorCode = error.json()['code'];

    if (typeof errorResponse === 'string') {
      throw {message: errorResponse, error: null};
    } else if (errorResponse) {
      let message: string;
      for (const key in errorResponse) {
        if (errorResponse.hasOwnProperty(key)) {
          message = errorResponse[key];
          break;
        }
      }
      return Observable.throw({message: message, error: errorResponse, code: errorCode});
    } else if (typeof messageRes === 'string') {
      throw {message: messageRes, error: null, code: errorCode};
    } else {
      throw {message: 'Some error occured! Please try again later.', error: null};
    }
  }

  login(data: { email: string, password: string }): Observable<User> {
    this.store.dispatch(new LoginRequestAction());
    return this.get('/authenticate', data).map(res => {
      localStorage.setItem('auth_token', res.json().token);
      const userObject = Object.assign(new User(), res.json().user);
      this.store.dispatch(new LoginSuccessAction(userObject));
      return userObject;
    }).catch(err => this.handleError.bind(this));
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.store.dispatch(new AppStateResetAction());
  }

  me(): Observable<User> {
    this.store.dispatch(new UserProfileRequestAction());
    return this.get('/me?include=following').map(res => {
      const user = res.json().data;

      this.store.dispatch(new UserProfileSuccessAction(user));

      return user;
    }).catch((error) => this.handleError.bind(this));
  }

  updateMe(data: any): Observable<User> {
    this.store.dispatch(new UpdateRequestAction());

    return this.put('/me', data).map(res => {
      const user = res.json().data;
      this.store.dispatch(new UpdateSuccessAction(user));

      return user;
    }).catch(err => this.handleError.bind(this));
  }

  listFollowers(): Observable<User[] | {}> {
    this.store.dispatch(new FollowerIndexRequestAction());
    return this.get('/followers').map(res => {
      const followers = res.json().data;
      this.store.dispatch(new FollowerIndexSuccessAction(followers));

      return followers;
    }).catch(err => this.handleError.bind(this));
  }

  addFollower() {

  }

  removeFollower(id: number): Observable<any> {
    this.store.dispatch(new FollowerDeleteRequestAction());

    return this.post('/users/' + id + '/un-follow').map(() => {
      this.store.dispatch(new FollowerDeleteSuccessRequest(id));

      return;
    })
  }

  listMyActivities(): Observable<Activity[] | {}> {
    this.store.dispatch(new ActivityIndexRequestAction());
    return this.get('/activities?include=owner,members').map(res => {
      const activities = res.json().data;
      this.store.dispatch(new ActivityIndexSuccessAction(activities));

      return activities;
    }).catch(err => this.handleError.bind(this));
  }

  createActivity(data: { title: string, description?: string, start: string, end?: string, type: string, link?: string, meta?; any }): Observable<Activity> {
    this.store.dispatch(new ActivityCreateRequest());
    return this.post('/activities', data).map(res => {
      const activity = Object.assign(new Activity(), res.json().data);
      this.store.dispatch(new ActivityCreateSuccess(activity));

      return activity;
    }).catch(err => this.handleError.bind(this));
  }

  updateActivity(activityId: number, data: { title?: string, description?: string, link?: string, meta?: any }): Observable<Activity> {
    this.store.dispatch(new ActivityUpdateRequestAction());
    return this.put('/activities/' + activityId, data).map(res => {
      const activityObject = Object.assign(new Activity(), res.json().data);
      this.store.dispatch(new ActivityUpdateSuccessAction(activityObject));
      return activityObject;
    }).catch(err => this.handleError.bind(this));
  }

  deleteActivity(id: number): Observable<any> {
    this.store.dispatch(new ActivityDeleteRequestAction());
    return this.delete('/activities/' + id).map(() => {
      this.store.dispatch(new ActivityDeleteSuccessRequest(id));

      return id;
    }).catch(err => this.handleError.bind(this));
  }

  register(data: { email: string, name: string, password: string, password_confirmation: string }): Observable<User> {
    return this.post('/register', data).map(res => {
      localStorage.setItem('auth_token', res.json().token);
      const userObject = Object.assign(new User(), res.json().user);
      this.store.dispatch(new LoginSuccessAction(userObject));
      return userObject;
    }).catch((error) => this.handleError.bind(this)(error));
  }

  listEducations(): Observable<Education[] | {}> {
    this.store.dispatch(new EducationIndexRequestAction());
    return this.get('/educations').map(res => {
      const educations = res.json().data;

      this.store.dispatch(new EducationIndexSuccessAction(educations));

      return educations;
    }).catch(err => this.handleError.bind(this));
  }

  createEducation(data: { school: string, degree: string, grade: string, grade_type: string, start: string, end?: string, location?: string }): Observable<Education> {
    this.store.dispatch(new EducationCreateRequest());
    return this.post('/educations', data).map(res => {
      const education = res.json().data;
      this.store.dispatch(new EducationCreateSuccess(education));

      return education;
    }).catch(err => this.handleError.bind(this));
  }

  updateEducation(educationId: number, data: { school?: string, degree?: string, grade?: string, grade_type?: string, start?: string, end?: string, location?: string }): Observable<Education> {
    this.store.dispatch(new EducationUpdateRequestAction());
    return this.put('/educations/' + educationId, data).map(res => {
      const education = res.json().data;
      this.store.dispatch(new EducationUpdateSuccessAction(education));

      return education;
    }).catch(err => this.handleError.bind(this));
  }

  deleteEducation(educationId: number): Observable<number | {}> {
    this.store.dispatch(new EducationDeleteRequestAction());
    return this.delete('/educations/' + educationId).map(() => {
      this.store.dispatch(new EducationDeleteSuccessRequest(educationId));

      return educationId;
    }).catch(err => this.handleError.bind(this));
  }

  listExperiences(): Observable<Experience[] | {}> {
    return this.get('/experiences').map(res => {
      this.store.dispatch(new ExperienceIndexRequestAction());
      const array = res.json().data;
      this.store.dispatch(new ExperienceIndexSuccessAction(array));

      return array;
    }).catch(err => this.handleError.bind(this))
  }

  createExperience(data: {
    organisation_name: string, designation: string, description?: string, from: string, to?: string, location: string
  }): Observable<Experience> {
    this.store.dispatch(new ExperienceCreateRequest());
    return this.post('/experiences', data).map(res => {
      const exp = res.json().data;

      this.store.dispatch(new ExperienceCreateSuccess(exp));

      return exp;
    }).catch(err => this.handleError.bind(this))
  }

  updateExperience(id: number, data: {
    organisation_name?: string, designation?: string, description?: string, from?: string, to?: string, location?: string
  }): Observable<Experience> {
    this.store.dispatch(new ExperienceUpdateRequestAction());
    return this.put('/experiences/' + id, data).map(res => {
      const exp = res.json().data;
      this.store.dispatch(new ExperienceUpdateSuccessAction(exp));

      return exp;
    }).catch(err => this.handleError.bind(this))
  }

  deleteExperience(id: number): Observable<any> {
    this.store.dispatch(new ExperienceDeleteRequestAction());
    return this.delete('/experiences/' + id).map(() => {
      this.store.dispatch(new ExperienceDeleteSuccessRequest(id));

      return id;
    }).catch(err => this.handleError.bind(this));
  }

  sendUserMessage(data: { message: number, channel: string }): Observable<any> {
    return this.post('/messages/users', data).map(() => {
      return;
    });
  }

}
