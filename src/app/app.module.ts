import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppComponent} from "./containers/app.component";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
