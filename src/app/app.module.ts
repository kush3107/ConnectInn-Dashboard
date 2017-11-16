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
import {reducer} from "./reducers/index";
import {AlertService} from "./services/alert";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BootstrapComponent} from "./containers/bootstrap";
import {CentreSpinnerComponent} from "./components/custom/center-spinner";
import {ErrorComponent} from "./components/custom/error";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    BootstrapComponent,
    CentreSpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    StoreModule.forRoot(reducer),
  ],
  providers: [
    ConnectInnService,
    AlertService,
    AnonymousGuard,
    BootstrapGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
