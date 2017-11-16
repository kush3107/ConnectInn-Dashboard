import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {getAppIsBootstrapped, isLoggedIn, State} from '../reducers/index';
import {Store} from '@ngrx/store';
import {SetLandingUrlAction} from '../actions/app';
import {ConnectInnService} from "../services/connect-inn";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private service: ConnectInnService,
              private store: Store<State>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    if (!ConnectInnService.hasLoginToken()) {
      this.store.dispatch(new SetLandingUrlAction(state.url));
      this.router.navigate(['/login']);
      return false;
    }

    const observables = Observable.combineLatest(
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
      if (!data.isLoggedIn || !data.isBootstrapped) {
        this.store.dispatch(new SetLandingUrlAction(state.url));
        this.router.navigate(['/']);
      }

      return data.isLoggedIn;
    });
  }
}
