import {Routes} from "@angular/router";
import {AnonymousGuard} from "./guards/anonymous";
import {LoginComponent} from "./components/login";

export const routes: Routes = [
  {
    path: '',
    canActivate: [AnonymousGuard],
    children: [
      // {
      //   path: 'signup', component: SignUpComponent
      // },
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
