import {Http, RequestOptions, Headers} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Utils} from "../utils";
import {MatSnackBar} from "@angular/material";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {isUndefined} from "util";
import {Store} from "@ngrx/store";
import {State} from "../reducers/index";
import {
  LoginRequestAction, LoginSuccessAction, UpdateRequestAction,
  UpdateSuccessAction
} from "../actions/user";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import * as fromUser from '../actions/user';
import {Router} from "@angular/router";
import {AppStateResetAction} from "../actions/index";

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

  private handleError(error: Response): Observable<Error> {

    if (error.status === 401) {
      this.router.navigate(['/logout']);
      return Observable.throw({message: 'Unauthorized access!', error: null});
    }

    const errorResponse = error.json()['errors'];
    const messageRes = error.json()['message'];
    const errorCode = error.json()['code'];

    if (typeof errorResponse === 'string') {
      return Observable.throw({message: errorResponse, error: null});
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
      return Observable.throw({message: messageRes, error: null, code: errorCode});
    }
  }

  login(data: { email: string, password: string }): Observable<User> {
    this.store.dispatch(new LoginRequestAction());
    return this.get('/authenticate', data).map(res => {
      localStorage.setItem('auth_token', res.json().token);
      const userObject = Object.assign(new User(), res.json().user);
      this.store.dispatch(new LoginSuccessAction(userObject));
      return userObject;
    }).catch(err => this.handleError(err));
  }

  logout() {
    localStorage.clear();
    this.store.dispatch(new AppStateResetAction());
  }

  me(): Observable<User> {
    return this.get('/me').map(res => {
      const user = res.json().data;
      const userObject = Object.assign(new User(), user);

      this.store.dispatch(new fromUser.UpdateSuccessAction(userObject));

      return userObject;
    }).catch((error) => this.handleError(error));
  }

  updateMe(data: any): Observable<User> {
    this.store.dispatch(new UpdateRequestAction());

    return this.put('/me', data).map(res => {
      const user = res.json().data;
      this.store.dispatch(new UpdateSuccessAction(user));

      return user;
    });
  }

  register(data: {email: string, name: string, password: string, password_confirmation: string}): Observable<User> {
    return this.post('/register', data).map(res => {
      localStorage.setItem('auth_token', res.json().token);
      const userObject = Object.assign(new User(), res.json().user);
      this.store.dispatch(new LoginSuccessAction(userObject));
      return userObject;
    }).catch((error) => this.handleError(error));
  }
}
