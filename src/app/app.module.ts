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
import { RecordsListComponent } from './books/records-list/records-list.component';
import { RecordsDialogComponent } from './shared/records-dialog/records-dialog.component';
import { JobsComponent } from './books/jobs/jobs.component';
import { JobListComponent } from './books/job-list/job-list.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

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
    RecordsListComponent,
    JobsComponent,
    JobListComponent,
    DialogComponent,
    RecordsDialogComponent,
    ConfirmationDialogComponent
    
    
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
  entryComponents: [DialogComponent,RecordsDialogComponent,ConfirmationDialogComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
