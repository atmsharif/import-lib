import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginService } from 'authentication';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ImsService } from 'client-model';
import { ILoginService } from 'authentication-model';
import { LoginComponent } from './login/login.component';
import { adminSpaErrors, adminSpaErrorCode, adminSpaErrorType } from '../errors';
import { HttpClientModule } from '@angular/common/http';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ClientSearchBasicComponent } from './client-search/client-search-basic/client-search-basic.component';
import { ClientSearchAdvancedComponent } from './client-search/client-search-advanced/client-search-advanced.component';
import { ClientSearchService } from 'client';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientGridResultsComponent } from './client-grid-results/client-grid-results.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { PaginationComponent } from './client-search/pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientSearchMockService } from 'client-mock';
import { LoginServiceMock } from 'authentication-mock';
import { AppConfig } from '../config/app-config.service';
import { environment } from '../environments/environment';

export function initializeAppConfig(appConfig: AppConfig) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    ClientSearchComponent,
    ClientSearchBasicComponent,
    ClientSearchAdvancedComponent,
    ClientDetailsComponent,
    ClientGridResultsComponent,
    LoadingBarComponent,
    ErrorMessageComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    NgbModule
    ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: initializeAppConfig, deps: [AppConfig], multi: true},
    { provide: ImsService, useClass: environment.production ? ClientSearchService : ClientSearchMockService },
    { provide: ILoginService, useClass: environment.production ? LoginService : LoginServiceMock  },
    { provide: 'errorMessages', useValue: adminSpaErrors },
    { provide: 'errorCode', useValue: adminSpaErrorCode },
    DatePipe
    ],
  bootstrap: [AppComponent]
})

export class AppModule { }
