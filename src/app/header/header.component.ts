import { Component, OnInit } from '@angular/core';
import {AppserviceService} from '../service/appservice.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isSearchOn:boolean
  private searchForm:FormGroup
  constructor(private appService:AppserviceService,private router:Router) { }
  
  ngOnInit() {
    this.router.navigate(['/'])
      this.appService.isSearchAvailable.subscribe(search=>{
        console.log(search)
        this.isSearchOn = search;
      });

 

      

  }



}
