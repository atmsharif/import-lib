import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, EMPTY, Subject } from 'rxjs';
import { Router, ChildActivationStart } from '@angular/router';
import { SystemError } from 'authentication-model';
import { map, catchError } from "rxjs/operators";
import { ILoginService } from 'authentication-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginService {
  public session: string;
  public currentRefresh : Observable<boolean>;

  private readonly sessionName = 'adminspa-session';
  private readonly sessionErrorName = 'adminspa-session-error';
  private readonly targetUrlName = 'adminspa-session-url';

  private sessionError: string;
  //private logoutTimer : Timer;
  //private _providers : IProvider[];
  //private _providersCall : Observable<IProvider>;
  //public loggedOut: EventEmitter<void>; 

  constructor(private http: HttpClient, private router: Router, @Inject('loginServiceEndpoint') @Optional() public serviceEndpoint?: string) {
        //this.loggedOut = new EventEmitter<void>();
        //Href.serviceCalled.subscribe(() => { this.resetLogoutTimer(); });

        let rawError = sessionStorage.getItem(this.sessionErrorName);
        if(rawError) {
            this.sessionError = JSON.parse(rawError);
            sessionStorage.removeItem(this.sessionErrorName);
            return; // if we have an error, we don't want to attempt to load the session
        }
        
        let rawSession = sessionStorage.getItem(this.sessionName);
        if (rawSession) {
            this.session = rawSession;

            // if (RAMLoginService.session.sessionTimeOutInSeconds > 0) {
            //     this.logoutTimer = new Timer(RAMLoginService.session.sessionTimeOutInSeconds * 1000, () => {
            //         this.setTargetUrl(router.url);
            //         this.sessionError = { errorMessage: 'Your session has expired. Log in again. If the issue persists, contact the AUSkey helpdesk on 1300 AUSkey (Error code 22003)' };
            //         this.logout();
            //     });
        }
    }

    public updateSession(rawSession: string): boolean {
        this.currentRefresh = null;
        this.session = rawSession;
        sessionStorage.setItem(this.sessionName, rawSession);
        
        return true;
    }

    public isAuthenticated = (): boolean => {
        return this.session ? true : false;
    }

    public getTargetUrl() {
        let url = sessionStorage.getItem(this.targetUrlName);
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
        // if (error) {
        //     this.sessionError = adminSpaErrors[[adminSpaErrorCode.E1001].toString()];
        //     this.sessionError.originalError = this.sessionError.toString();
        // }
        this.sessionError = error;
    }

    public clearSessionError = (): void => {
        this.sessionError = null;
    }
   
//     public refresh = (): Observable<boolean> => {
//         if (!LoginService.currentRefresh) {
//             LoginService.currentRefresh = this.http.put("Constants.uiApiServices.SESSION_URL", LoginService.session)
// //.map(x => (this.updateSession(x.text())))
//             .pipe(
//               map( response => {
//                 x => (this.updateSession(x.text()))
//              } )
//             )
//             // .catch((err, res) => {
//             //     this.setSessionError({ errorMessage: 'Attempt to log in again. If the issue persists, contact the AUSkey helpdesk on 1300 AUSkey (Error code 22001)' }); 
//             //     this.logout(); //when refresh failed, logout immediately.},
//             //     return Observable.throw(err); //throw error so that the error returns to the observable chain
//             // })               
//             // .share();
//         }
//         return LoginService.currentRefresh;
//     }

    public logout = () => {
        //this.loggedOut.emit();
        this.deleteSession();
        //this.router.navigate(['/login']);       
        this.resetLogoutTimer();
    }

    public goTo500Page = () => {
        this.router.navigate(['/500']);    
    }

    public resetLogoutTimer = () => {
        // if(this.logoutTimer) {
        //     this.logoutTimer.reset();
        // }
    }

    public deleteSession = () => {
        sessionStorage.removeItem(this.sessionName);
        this.session = null;        
    }
}
