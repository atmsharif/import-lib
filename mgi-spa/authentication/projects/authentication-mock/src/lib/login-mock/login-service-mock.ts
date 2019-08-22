import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, EMPTY, Subject } from 'rxjs';
import { Router, ChildActivationStart } from '@angular/router';
import { SystemError } from 'authentication-model';
// import { adminSpaErrors, adminSpaErrorCode } from '../errors';
import { map, catchError } from 'rxjs/operators';
import { ILoginService } from 'authentication-model';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceMock implements ILoginService {
  public session: string;
  public currentRefresh: Observable<boolean>;

  private readonly sessionName = 'adminspa-session';
  private readonly sessionErrorName = 'adminspa-session-error';
  private readonly targetUrlName = 'adminspa-session-url';

  private sessionError: string;

  constructor(private http: HttpClient, private router: Router) {
        // use a fake access token for the mock
        // tslint:disable-next-line: max-line-length
        this.session = '{\'AccessToken\':\'MAX_COVERAGE\',\'SessionTimeout\':1551313557,\'User\':{\'FirstName\':\'Max\',\'IDToken\':\'MAX_COVERAGE\',\'Roles\':[\'Administrator\'],\'Surname\':\'Coverage\',\'Username\':\'ucmax\'}}';
    }

    public updateSession(rawSession: string): boolean {
        this.currentRefresh = null;

        return true;
    }

    public isAuthenticated = (): boolean => {
        // drop the fake token into the session storage
        sessionStorage.setItem(this.sessionName, this.session);
        return this.session ? true : false;
    }

    public getTargetUrl() {
        const url = sessionStorage.getItem(this.targetUrlName);
        if (url) {
            sessionStorage.removeItem(this.targetUrlName);
            return url;
        }
    }

    public setTargetUrl(url: string) {
       sessionStorage.setItem(this.targetUrlName, url);
    }

    public getSessionError = (): string => {
        return this.sessionError ? this.sessionError : null;
    }

    public setSessionError = (error: string) => {
        // tslint:disable-next-line: max-line-length
        this.session = '{\'AccessToken\':\'MAX_COVERAGE\',\'SessionTimeout\':1551313557,\'User\':{\'FirstName\':\'Max\',\'IDToken\':\'MAX_COVERAGE\',\'Roles\':[\'Administrator\'],\'Surname\':\'Coverage\',\'Username\':\'ucmax\'}}';
        sessionStorage.setItem(this.sessionName, this.session);
    }

    public clearSessionError = (): void => {
        this.sessionError = null;
    }


    public logout = () => {
    }

    public goTo500Page = () => {
        this.router.navigate(['/500']);
    }

    public resetLogoutTimer = () => {
    }

    public deleteSession = () => {
        sessionStorage.removeItem(this.sessionName);
        this.session = null;
    }
}
