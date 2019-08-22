import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ILoginService } from 'authentication-model';

@Injectable({
  providedIn: 'root'
})
/*
* This class protects routes that should only be available to unauthenticated users (eg the login page)
*/
export class UnauthenticatedGuard implements CanActivate {

  constructor(private loginService : ILoginService, private router: Router) {
  }

  public canActivate() {
    return this.loginService.isAuthenticated() ? this.router.navigate(['/']) : true;
  }
}
