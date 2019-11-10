import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppserviceService } from '../../service/appservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoading:boolean;

  constructor(
    private appService: AppserviceService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.appService.setSeatchOn(false);
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.appService.setLoggedUser(null);
  }

  loginFrom(form) {
    if (form.invalid) {
      return;
    }
    const getLocaldb = JSON.parse(localStorage.getItem('logindetails'));
    const getVerifiedUser: any = this.verifyUser(getLocaldb, form.value);
    if (!getVerifiedUser.isValid) {
      this.loginForm.setValue({
        email: '',
        password: ''
      });
      return;
    }
    this.appService.setLoggedUser(getVerifiedUser.loggedInUser);
    this.router.navigate(['/retirement']);
  }

  verifyUser(getLogindetails, formdetails) {
    if (!getLogindetails) {
      return false;
    }
    const getFilterLogin = getLogindetails.filter(item => {
      return (
        item.email === formdetails.email &&
        item.password === formdetails.password
      );
    });

    return getFilterLogin.length > 0
      ? { isValid: true, loggedInUser: getFilterLogin[0] }
      : { isValid: false, loggedInUser: getFilterLogin };
  }
}
