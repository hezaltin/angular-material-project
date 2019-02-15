import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustoumValidators } from './sign-up.component.config';
import { AppserviceService } from 'src/app/service/appservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm:FormGroup
  constructor(private router:Router,private fb:FormBuilder,private appService:AppserviceService) { }

  ngOnInit() {

    this.signUpForm = this.fb.group({
      name:['',[CustoumValidators.nameValidators,CustoumValidators.required]],
      email:['',[CustoumValidators.emailValidators,CustoumValidators.required]],
      password:['',Validators.required],
      userCart:this.fb.array([])
    });
    this.appService.setLoggedUser(null);
  }

  signupform(form){
    if(form.invalid){
      return;
    }
    console.log(form.value)
    let getLocalDb = JSON.parse(localStorage.getItem('logindetails'));
    console.log(getLocalDb);
      let setLocalDb= getLocalDb? [form.value,...getLocalDb] : [form.value];
      this.appService.setLoggedUser(form.value);
    localStorage.setItem('logindetails',JSON.stringify(setLocalDb))
    this.router.navigate(['/search'])
    console.log(form)
  }

}
