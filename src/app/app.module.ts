import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { AppROutingModule } from './app.routing.module'
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SearchComponent} from './books/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  //  NoopAnimationsModule,
    HttpClientModule,
    MaterialModule,
  AppROutingModule,

  ],
  //entryComponents: [DialogOverviewTransferDialog],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
