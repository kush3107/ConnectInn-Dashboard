import {Routes} from "@angular/router";
import {AnonymousGuard} from "./guards/anonymous";
import {LoginComponent} from "./components/login";
import {RegisterComponent} from "./components/register";

export const routes: Routes = [
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
  }
  // {path: '**', component: NotFoundComponent}
];
