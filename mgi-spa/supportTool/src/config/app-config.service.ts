import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { IAppConfig } from 'client-model';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  static settings: IAppConfig;

  constructor(private http: HttpClient) {}

  loadConfig() {
      const configUrl = `assets/config/config.json`;

      return new Promise<void>((resolve, reject) => {
        this.http.get<IAppConfig>(configUrl)
        .pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        )
        .toPromise().then(config => {
             AppConfig.settings = config;
             resolve();
          });
      });
  }
  
  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }
}