import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
    const fakeRoute = {
    navigate: (...a) => new Promise(r => r(true))
  } as Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatFormFieldModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ SignupComponent ],
      providers:[AppserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a form fields',()=>{

    const spyOnComponent= spyOn(component,'ngOnInit');
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.ngOnInit).toBeTruthy();  
    expect(spyOnComponent).toHaveBeenCalled();   
  })

  it('form invalid when empty', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });
});
