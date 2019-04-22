import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { AppROutingModule } from './app.routing.module'
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
import { RouterTestingModule } from '@angular/router/testing';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
    // LoginComponent,
    // SignupComponent,
    // SearchComponent,
    // UserListComponent,
    // MyBookListComponent,
    // RetirementCalculatorComponent,
    // RecordsListComponent,
    // JobsComponent,
    // JobListComponent,
    // DialogComponent,
    // RecordsDialogComponent,
    // ConfirmationDialogComponent
      ],
      imports:[
        RouterTestingModule,
      //  BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    MaterialModule,
      ]
    }).compileComponents();
  }));
  it('should create the app',(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-material-project!');
  }));
});
