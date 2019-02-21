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
import { UserListComponent } from './books/user-list/user-list.component';
import { MyBookListComponent } from './books/my-book-list/my-book-list.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { RetirementCalculatorComponent } from './books/retirement-calculator/retirement-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    UserListComponent,
    MyBookListComponent,
    RetirementCalculatorComponent,
    DialogComponent
    
    
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
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
