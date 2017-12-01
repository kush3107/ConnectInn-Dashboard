import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {getEducationsLoaded, getMyActivitiesLoaded, isLoggedIn, State} from '../reducers/index';
import {Store} from '@ngrx/store';
import {ConnectInnService} from "../services/connect-inn";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private service: ConnectInnService,
              private store: Store<State>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    if (!ConnectInnService.hasLoginToken()) {
      this.router.navigate(['/login']);
      return false;
    }


    const loggedIn$ = this.store.select(isLoggedIn);
    const educationsLoaded$ = this.store.select(getEducationsLoaded);
    const activitiesLoaded$ = this.store.select(getMyActivitiesLoaded);


    return loggedIn$.combineLatest(educationsLoaded$, activitiesLoaded$, (loggedIn, educationsLoaded, activitiesloaded) => {
      return loggedIn && educationsLoaded && activitiesloaded;
    }).map(alreadyBootsrapped => {
      if (!alreadyBootsrapped) {
        this.router.navigate(['/']);
      }

      return alreadyBootsrapped;
    });
  }
}
