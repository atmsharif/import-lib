import { Component, OnInit, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemError } from 'client-model';
import { adminSpaErrors, adminSpaErrorCode } from '../../errors';
import { Router } from '@angular/router';
import { map, catchError } from "rxjs/operators";
import { ILoginService } from 'authentication-model';
import { AppConfig } from '../../config/app-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  loginError: SystemError;
  public loginServiceEndpoint: string;

  constructor(private http: HttpClient, private loginService: ILoginService, 
    private router: Router) {
      this.loginServiceEndpoint = AppConfig.settings.serviceEndpoint.managedServicelogin;
   }

    ngOnInit() {

    
        this.http.get(this.loginServiceEndpoint).subscribe(
            (res) => {
              this.loginService.updateSession(JSON.stringify(res));

              this.router.navigate(['']);
            },
            error => {
              this.loginError = adminSpaErrors[[adminSpaErrorCode.E1000].toString()];
              this.loginError.originalError = JSON.stringify(error);
              sessionStorage.setItem('adminspa-session-error', JSON.stringify(error));
              this.loginService.setSessionError(JSON.stringify(error));
            }
        );
  }
}
