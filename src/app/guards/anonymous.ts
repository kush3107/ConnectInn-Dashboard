import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ConnectInnService} from "../services/connect-inn";
import {Injectable} from "@angular/core";

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(private router: Router, private service: ConnectInnService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!ConnectInnService.hasLoginToken()) {
      return true;
    }

    this.router.navigate(['/feed']);
    return false;
  }
}
