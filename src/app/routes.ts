import {Routes} from "@angular/router";
import {AnonymousGuard} from "./guards/anonymous";
import {LoginComponent} from "./components/login";
import {RegisterComponent} from "./components/register";
import {BootstrapComponent} from "./containers/bootstrap";
import {BootstrapGuard} from "./guards/bootstrap";
import {LogoutComponent} from "./components/logout";

export const routes: Routes = [
  {path: '', component: BootstrapComponent, canActivate: [BootstrapGuard]},
  {
    path: '',
    canActivate: [AnonymousGuard],
    children: [
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      // {
      //   path: 'reset-password', component: ResetPasswordComponent
      // },
      // {
      //   path: 'forgot-password', component: ForgotPasswordComponent
      // }
    ]
  },
  {path: 'logout', component: LogoutComponent},
  // {path: '**', component: NotFoundComponent}
];
