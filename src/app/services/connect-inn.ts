import {Http, RequestOptions, Headers} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Utils} from "../utils";
import {MatSnackBar} from "@angular/material";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import 'rxjs';
import {isUndefined} from "util";
import {Store} from "@ngrx/store";
import {State} from "../reducers/index";
import {LoginRequestAction, LoginSuccessAction} from "../actions/user";

@Injectable()
export class ConnectInnService {
  private BASE_URL = environment.apiBaseURL;

  static hasLoginToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  constructor(private http: Http, private httpClient: HttpClient, private snackBar: MatSnackBar, private store: Store<State>) {
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
    console.log('[sd-error] start');
    console.log(error);
    console.log('[sd-error] end');

    if (error.status === 401) {
      localStorage.removeItem('auth_token');
      this.snackBar.open('Unauthorized', '', {
        duration: 4000,
      });
      return Observable.throw({messages: ['Unauthorized'], error: null});
    }

    const errorObject = error.json();
    const errorResponse = errorObject['errors'];

    const messages = [];

    if (isUndefined(errorResponse)) {
      messages.push(errorObject['message']);
    } else {
      if (typeof errorResponse === 'string') {
        return Observable.throw({messages: [errorResponse], error: null});
      } else {
        for (const key in errorResponse) {
          if (errorResponse.hasOwnProperty(key)) {
            messages.push(errorResponse[key]);
          }
        }
      }
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

  // register(data: {email: string, name: string, password: string, password_confirmation: string}): Observable<User> {
  //   this.post('/register', data).map(res => {
  //     const user =
  //   });
  // }
}
