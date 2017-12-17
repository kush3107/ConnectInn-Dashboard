import {Component, OnDestroy, OnInit} from "@angular/core";
import {User} from "../models/user";
import {ConnectInnService} from "../services/connect-inn";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {
  getAppLandingUrl, getEducationsLoaded, getEducationsLoading, getExperiencesLoaded, getExperiencesLoading,
  getFollowerLoaded, getFollowerLoading, getMyActivitiesLoaded, getMyActivitiesLoading, getUser, isLoggedIn,
  isLoggingIn, State
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

    this.store.select(getAppLandingUrl).subscribe(url => this.redirectUrl);

    const loggedIn$ = this.store.select(isLoggedIn);
    const loggingIn$ = this.store.select(isLoggingIn);

    const educationsLoaded$ = this.store.select(getEducationsLoaded);
    const educationsLoading$ = this.store.select(getEducationsLoading);

    const experiencesLoading$ = this.store.select(getExperiencesLoading);
    const experiencesLoaded$ = this.store.select(getExperiencesLoaded);

    const myActivitiesLoaded$ = this.store.select(getMyActivitiesLoaded);
    const myActivitiesLoading$ = this.store.select(getMyActivitiesLoading);

    const followersLoading$ = this.store.select(getFollowerLoading);
    const followersLoaded$ = this.store.select(getFollowerLoaded);

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

    experiencesLoading$.combineLatest(experiencesLoaded$, (loading, loaded) => {
      return {loading, loaded}
    }).takeWhile(() => this.isAlive).subscribe(data => {
      if (!data.loading && !data.loaded) {
        this.service.listExperiences().subscribe(exps => {
          // console.log(exps);
        }, err => {
          this.failedLoading = true;
        });
      }
    });

    myActivitiesLoading$.combineLatest(myActivitiesLoaded$, (loading, loaded) => {
      return {loading, loaded};
    }).takeWhile(() => this.isAlive).subscribe(data => {
      if (!data.loading && !data.loaded) {
        this.service.listMyActivities().subscribe((a) => {
        }, err => {
          console.log('failed in activities');
          console.log(err);
          this.failedLoading = true;
        });
      }
    });

    followersLoading$.combineLatest(followersLoaded$, (loading, loaded) => {
      return {loading, loaded};
    }).takeWhile(() => this.isAlive).subscribe(data => {
      if (!data.loading && !data.loaded) {
        this.service.listFollowers().subscribe();
      }
    });

    loggedIn$.combineLatest(educationsLoaded$, myActivitiesLoaded$, followersLoaded$, experiencesLoaded$, (loggedIn, educationsLoaded, myActivitiesLoaded, followersLoaded, experiencesLoaded) => {
      return {loggedIn, educationsLoaded, myActivitiesLoaded, followersLoaded, experiencesLoaded};
    }).takeWhile(() => this.isAlive).subscribe(data => {
      if (data.loggedIn && data.educationsLoaded && data.myActivitiesLoaded && data.followersLoaded && data.experiencesLoaded) {
        console.log('loaded');
        this.store.select(getAppLandingUrl).takeWhile(() => this.isAlive).subscribe(url => {
          this.router.navigate([url]);
        })
      }
    });

  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
