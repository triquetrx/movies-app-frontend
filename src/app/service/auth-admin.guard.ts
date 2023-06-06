import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    private service: AuthenticationService,
    private cookie: CookieService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token: string = this.cookie.get('token');
    if (token) {
      return this.service.validateToken(token).pipe(
        take(1),
        map((value) => {
          if (!value?.payload?.role) {
            this.cookie.delete('token');
            this.cookie.delete('role');
            return false;
          }
          if (
            !this.cookie.get('role') ||
            this.cookie.get('role') !== value?.payload?.role
          ) {
            this.cookie.set('role', value?.payload?.role);
          }
          if (
            this.cookie.get('role') === value?.payload?.role &&
            this.cookie.get('role') === 'ADMIN'
          ) {
            if (!this.cookie.get('email')) {
              this.cookie.set('email', value?.payload?.email);
            }
            return true;
          }
          this.router.navigate(['/movies']);
          return false;
        })
      );
    }
    return false;
  }
}
