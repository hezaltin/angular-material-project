import { Component, OnInit } from '@angular/core';
import {AppserviceService} from '../service/appservice.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isSearchOn: boolean;
  public searchForm: FormGroup;
  constructor(private appService: AppserviceService, private router: Router,private translate:TranslateService) { }

  ngOnInit() {
    const getLocaldb = JSON.parse(localStorage.getItem('logindetails'));
    if (getLocaldb) {
      this.router.navigate(['/retirement']);
    } else {
      this.router.navigate(['/']);
    }

      this.appService.isSearchAvailable.subscribe(search => {
        this.isSearchOn = search;
      });





  }



}
