import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticatedGuard } from '../guards/authenticationGuard';
import { UnauthenticatedGuard } from '../guards/unauthenticationGuard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticatedGuard]},
  { path: 'login', component: LoginComponent, canActivate: [UnauthenticatedGuard]},
  //{ path: 'clientsearch', component: ClientSearchComponent },
  { path: '**', component: PageNotFoundComponent}
 // { path: '**', component: PageNotFoundComponent, canActivate: [AuthenticatedGuard] }

//   {
//     path: 'home',
//     component: WelcomeHomeComponent,
//     canActivate: [AuthenticatedGuard]
// },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
