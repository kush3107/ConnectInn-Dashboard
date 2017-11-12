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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AnonymousGuard,
    ConnectInnService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
