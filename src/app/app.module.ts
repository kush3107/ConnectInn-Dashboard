import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppComponent} from "./containers/app.component";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material.module";
import {LoginComponent} from "./components/login";
import {RouterModule} from "@angular/router";
import {routes} from "./routes";
import {AnonymousGuard} from "./guards/anonymous";
import {ConnectInnService} from "./services/connect-inn";
import {RegisterComponent} from "./components/register";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BootstrapGuard} from "./guards/bootstrap";
import {StoreModule} from "@ngrx/store";
import {AlertService} from "./services/alert";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BootstrapComponent} from "./containers/bootstrap";
import {CentreSpinnerComponent} from "./components/custom/center-spinner";
import {ErrorComponent} from "./components/custom/error";
import {LogoutComponent} from "./components/logout";
import {DashboardComponent} from "./containers/dashboard";
import {NotFoundComponent} from "./components/not-found";
import {FeedComponent} from "./components/feed";
import {AuthGuard} from "./guards/auth";
import {reducers} from './reducers/index';
import {HeaderComponent} from "./containers/header";
import {LayoutMainComponent} from "./components/layouts/main-layout";
import {MyActivitiesListComponent} from "./components/activities/my-activities";
import {CreateActivityDialogComponent} from "./components/dialogs/activities/create-activity-dialog";
import {ProfileComponent} from "./components/profile";
import {ActivityCardComponent} from "./components/activities/activity-card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ActivityDetailComponent} from "./components/activities/activity-detail";
import {ModalPopupLayoutComponent} from "./components/layouts/modal-popup-layout";

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    LayoutMainComponent,
    HeaderComponent,
    RegisterComponent,
    NotFoundComponent,
    DashboardComponent,
    BootstrapComponent,
    CentreSpinnerComponent,
    MyActivitiesListComponent,
    ModalPopupLayoutComponent,
    CreateActivityDialogComponent,
    ProfileComponent,
    ActivityCardComponent,
    ActivityDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    ConnectInnService,
    AlertService,
    AnonymousGuard,
    BootstrapGuard,
    AuthGuard
  ],
  entryComponents: [
    CreateActivityDialogComponent,
    ModalPopupLayoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
