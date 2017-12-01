import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {ConnectInnService} from "../services/connect-inn";
import {Store} from "@ngrx/store";
import {Injectable, OnInit} from "@angular/core";
import {
  getAppLandingUrl, getEducationsLoaded, getMyActivitiesLoaded, isLoggedIn, State
} from "../reducers/index";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/combineLatest";

@Injectable()
export class BootstrapGuard implements CanActivate, OnInit {
  constructor(private router: Router, private store: Store<State>) {
    console.log('Bootstrap guard init');

  }

  ngOnInit() {
    console.log('Bootstrap guard init');
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {

    if (!ConnectInnService.hasLoginToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    let redirectUrl: string;

    this.store.select(getAppLandingUrl).subscribe(url => redirectUrl = url);

    const loggedIn$ = this.store.select(isLoggedIn);
    const educationsLoaded$ = this.store.select(getEducationsLoaded);
    const activitiesLoaded$ = this.store.select(getMyActivitiesLoaded);


    return loggedIn$.combineLatest(educationsLoaded$, activitiesLoaded$, (loggedIn, educationsLoaded, activitiesloaded) => {
      return loggedIn && educationsLoaded && activitiesloaded;
    }).map(alreadyBootsrapped => {
      if (alreadyBootsrapped) {
        this.router.navigate(['/feed']);
      }

      return !alreadyBootsrapped;
    });

    // const observables = Rx.Observable.combineLatest(
    //   this.store.select(isLoggedIn),
    //   this.store.select(getAppIsBootstrapped),
    //   (isLoggedIn, isBootstrapped) => {
    //     return {
    //       isLoggedIn: isLoggedIn,
    //       isBootstrapped: isBootstrapped
    //     };
    //   }
    // );
    //
    // return observables.map((data) => {
    //   if (data.isLoggedIn && data.isBootstrapped) {
    //     this.router.navigate(['/feed']);
    //   }
    //
    //   return !data.isBootstrapped;
    // });
  }
}
