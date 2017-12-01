import {Component, OnDestroy, OnInit} from "@angular/core";
import {User} from "../models/user";
import {ConnectInnService} from "../services/connect-inn";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {
  getAppLandingUrl, getEducationsLoaded, getEducationsLoading, getMyActivitiesLoaded, getMyActivitiesLoading, getUser,
  isLoggedIn, isLoggingIn, State
} from "../reducers/index";
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'ci-bootstrap', template: `
    <ci-error (reload)="loadBootstrapData()" *ngIf="failedLoading">Unable to load data</ci-error>
    <ci-center-spinner *ngIf="!failedLoading"></ci-center-spinner>
  `, styles: []
})

export class BootstrapComponent implements OnInit, OnDestroy {
  failedLoading = false;
  private isAlive: boolean = true;

  user: User;
  redirectUrl: string;

  constructor(private service: ConnectInnService, private router: Router, private store: Store<State>) {
  }

  ngOnInit() {
    console.log('bootstrap component init');
    this.loadBootstrapData();
  }

  public loadBootstrapData() {
    // this.service.me().takeWhile(() => this.isAlive).subscribe();
    //
    // this.store.select(isLoggedIn).takeWhile(() => this.isAlive).subscribe((loggedIn) => {
    //   this.isUserLoaded = loggedIn;
    // });
    //
    // this.store.select(getUser).takeWhile(() => this.isAlive).subscribe((user) => {
    //   this.user = user;
    // });

    this.store.select(getAppLandingUrl).subscribe(url => this.redirectUrl);

    const loggedIn$ = this.store.select(isLoggedIn);
    const loggingIn$ = this.store.select(isLoggingIn);

    const educationsLoaded$ = this.store.select(getEducationsLoaded);
    const educationsLoading$ = this.store.select(getEducationsLoading);

    const myActivitiesLoaded$ = this.store.select(getMyActivitiesLoaded);
    const myActivitiesLoading$ = this.store.select(getMyActivitiesLoading);

    loggedIn$.combineLatest(loggingIn$, (loggedIn, loggingIn) => {
      return {loggedIn, loggingIn};
    }).takeWhile(() => this.isAlive).subscribe((data) => {
      if (!data.loggedIn && !data.loggingIn) {
        this.service.me().subscribe(() => {
        }, (error) => {
          console.log('failed in logging');
          this.failedLoading = true;
        });
      }
    });

    educationsLoading$.combineLatest(educationsLoaded$, (loading, loaded) => {
      return {loading, loaded};
    }).takeWhile(() => this.isAlive).subscribe(data => {
      if (!data.loading && !data.loaded) {
        this.service.listEducations().subscribe(() => {
        }, err => {
          console.log('failed in educations');
          this.failedLoading = true;
        });
      }
    });

    myActivitiesLoading$.combineLatest(myActivitiesLoaded$, (loading, loaded) => {
      return {loading, loaded};
    }).takeWhile(() => this.isAlive).subscribe(data => {
      if (!data.loading && !data.loaded) {
        this.service.listMyActivities().subscribe(() => {

        }, err => {
          console.log('failed in activities');
          console.log(err);
          this.failedLoading = true;
        });
      }
    });

    loggedIn$.combineLatest(educationsLoaded$, myActivitiesLoaded$, (loggedIn, educationsLoaded, myActivitiesLoaded) => {
      return {loggedIn, educationsLoaded, myActivitiesLoaded};
    }).takeWhile(() => this.isAlive).subscribe(data => {
      if (data.loggedIn && data.educationsLoaded && data.myActivitiesLoaded) {
        console.log('loaded');
        this.router.navigate(['/feed']);
      }
    });

  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
