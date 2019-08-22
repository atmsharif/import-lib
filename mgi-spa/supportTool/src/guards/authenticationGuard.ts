import { Injectable, Inject, Optional } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ILoginService } from 'authentication-model';

@Injectable({
  providedIn: 'root'
})
/*
* This class protects routes that require the user to be authenticated.
* If an unauthenticated user attempts to access a route, the destination is saved
* and the user is sent to the login page. If they successfully authenticate,
* they will be redirected to their original destination.
*/
export class AuthenticatedGuard implements CanActivate {
  private readonly failedUrlName = 'adminspa-session-url';

  constructor(private loginService: ILoginService, private router: Router,
              @Inject('loginServiceEndpoint') @Optional() public serviceEndpoint?: string) {
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
    if (this.loginService.isAuthenticated()) {
      const url = sessionStorage.getItem(this.failedUrlName);
      if (url) {
        sessionStorage.removeItem(this.failedUrlName);
        return this.router.navigate(url.split(','));
      } else {
        return true;
      }
    } else {
      sessionStorage.setItem(this.failedUrlName, route.url.toString());
      // below is not to navigate to a SPA route.
      // instead, we want the browser to go to that link.
      return this.router.navigate(['/login']);
    }
  }
}
