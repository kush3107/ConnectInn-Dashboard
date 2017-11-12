import {Http, RequestOptions, Headers} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Utils} from "../utils";
import {MatSnackBar} from "@angular/material";
import {Injectable} from "@angular/core";

@Injectable()
export class ConnectInnService {
  private BASE_URL = environment.apiBaseURL;

  static hasLoginToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  constructor(private http: Http, private httpClient: HttpClient, private snackBar: MatSnackBar) {
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
}
