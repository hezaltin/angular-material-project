import { Component, OnInit } from '@angular/core';
import {AppserviceService} from '../service/appservice.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isSearchOn: boolean;
  private searchForm: FormGroup;
  constructor(private appService: AppserviceService, private router: Router) { }

  ngOnInit() {
    const getLocaldb = JSON.parse(localStorage.getItem('logindetails'));
    if (getLocaldb) {
      this.router.navigate(['/search']);
    } else {
      this.router.navigate(['/']);
    }

      this.appService.isSearchAvailable.subscribe(search => {
        this.isSearchOn = search;
      });





  }



}
