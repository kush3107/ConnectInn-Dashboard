import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ConnectInnService} from "../services/connect-inn";

export class AnonymousGuard implements CanActivate {
  constructor(private router: Router, private service: ConnectInnService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!ConnectInnService.hasLoginToken()) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
