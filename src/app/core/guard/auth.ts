import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const url: string = state.url;
    return this.verifyLogin(url);
  }

  verifyLogin(url): boolean {
    if (this.authService.isAuthorized) {
      return true;
    }
    this.router.navigate(['sign-in'], { queryParams: { returnUrl: url } });
    return false;
  }
}
