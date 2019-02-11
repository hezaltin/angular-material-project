import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AppserviceService} from '../../service/appservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm:FormGroup

  constructor(private appService:AppserviceService,private router:Router,private fb:FormBuilder) { }

  ngOnInit() {
    this.appService.setSeatchOn(false)
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  loginFrom(form){
    if(form.invalid){
      return;
    }
    let getLocaldb= JSON.parse(localStorage.getItem('logindetails'));
    console.log(getLocaldb);
    let getVerifiedUser = this.verifyUser(getLocaldb,form.value);
    if(!getVerifiedUser){
      this.loginForm.setValue({
        email:'',
        password:''
      })
      return
    }
    this.router.navigate(['/search'])
    console.log(form)
  }

  verifyUser(getLogindetails,formdetails){
    if(!getLogindetails){
      return false
    }
    let getFilterLogin = getLogindetails.filter(item=>{
      return item.email === formdetails.email && item.password === formdetails.password
    })

    return getFilterLogin.length > 0 ? true : false;
  }

}
