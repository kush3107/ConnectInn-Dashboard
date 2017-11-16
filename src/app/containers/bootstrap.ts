import {Component, OnDestroy, OnInit} from "@angular/core";
import {User} from "../models/user";
import {ConnectInnService} from "../services/connect-inn";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getAppLandingUrl, getUser, isLoggedIn, State} from "../reducers/index";
import {AppBootstrapSuccessAction} from "../actions/index";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ci-bootstrap',
  template: `    
    <ci-error *ngIf="failedLoading">Unable to load data</ci-error>
    <ci-center-spinner *ngIf="!failedLoading"></ci-center-spinner>
  `,
  styles: []
})

export class BootstrapComponent implements OnInit, OnDestroy{
  failedLoading = false;
  private isAlive: boolean = true;

  isListingsLoaded: boolean;
  isUserLoaded: boolean;
  isAdminsLoaded: boolean;
  user: User;

  constructor(private service: ConnectInnService,
              private router: Router,
              private store: Store<State>) {
  }

  ngOnInit() {
    console.log('bootstrap component init');
    this.loadBootstrapData();
  }

  private loadBootstrapData() {
    this.service.me().takeWhile(() => this.isAlive).subscribe();

    this.store.select(isLoggedIn).takeWhile(() => this.isAlive).subscribe((loggedIn) => {
      this.isUserLoaded = loggedIn;
    });

    this.store.select(getUser).takeWhile(() => this.isAlive).subscribe((user) => {
      this.user = user;
    });

    const bootstrap = Observable.merge(
      this.store.select(isLoggedIn),
      (loggedIn) => ({})
    );

    bootstrap.takeWhile(() => this.isAlive).subscribe(
      (data) => {
        if (this.isUserLoaded) {
          return this.store.select(getAppLandingUrl).takeWhile(() => this.isAlive).subscribe((value) => {
            this.store.dispatch(new AppBootstrapSuccessAction());

            this.router.navigate([value]);
          });
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
