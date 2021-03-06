import {Routes} from "@angular/router";
import {AnonymousGuard} from "./guards/anonymous";
import {LoginComponent} from "./components/login";
import {RegisterComponent} from "./components/register";
import {BootstrapComponent} from "./containers/bootstrap";
import {BootstrapGuard} from "./guards/bootstrap";
import {LogoutComponent} from "./components/logout";
import {NotFoundComponent} from "./components/not-found";
import {DashboardComponent} from "./containers/dashboard";
import {AuthGuard} from "./guards/auth";
import {FeedComponent} from "./components/feed";
import {MyActivitiesListComponent} from "./components/activities/my-activities";
import {ProfileComponent} from "./components/profile";
import {ActivityDetailComponent} from "./components/activities/activity-detail";
import {InboxContainerComponent} from "./containers/inbox-container";
import {FollowersComponent} from "./components/followers";
import {InboxMessagesComponent} from "./components/inbox/inbox-messages";

export const routes: Routes = [
  {path: '', component: BootstrapComponent, canActivate: [BootstrapGuard]},
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'feed', component: FeedComponent
      },
      {
        path: 'my-activities', component: MyActivitiesListComponent
      },
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'activities/:id', component: ActivityDetailComponent
      },
      {
        path: 'inbox', component: InboxContainerComponent,
        children: [
          {
            path: ':channel', component: InboxMessagesComponent
          }
        ]
      },
      {
        path: 'followers', component: FollowersComponent
      }
    ]
  },
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
  {path: '**', component: NotFoundComponent}
];
