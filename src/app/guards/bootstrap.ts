import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {ConnectInnService} from "../services/connect-inn";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {getAppIsBootstrapped, getAppLandingUrl, isLoggedIn, State} from "../reducers/index";
import 'rxjs';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class BootstrapGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store<State>) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | Rx.Observable<boolean> {

    if (!ConnectInnService.hasLoginToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    const observables = Rx.Observable.combineLatest(
      this.store.select(isLoggedIn),
      this.store.select(getAppIsBootstrapped),
      (isLoggedIn, isBootstrapped) => {
        return {
          isLoggedIn: isLoggedIn,
          isBootstrapped: isBootstrapped
        };
      }
    );

    return observables.map((data) => {
      if (data.isLoggedIn && data.isBootstrapped) {
        return this.store.select(getAppLandingUrl).subscribe((value) => {
          this.router.navigate([value]);
        });
      }

      return !data.isBootstrapped;
    });
  }
}
