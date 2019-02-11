import { Component, OnInit } from '@angular/core';
import {AppserviceService} from '../service/appservice.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isSearchOn:boolean
  private searchForm:FormGroup
  constructor(private appService:AppserviceService,private fb:FormBuilder) { }
  
  ngOnInit() {
      this.appService.isSearchAvailable.subscribe(search=>{
        console.log(search)
        this.isSearchOn = search;
      });

      this.searchForm = this.fb.group({
        searchInput:['']
      });
      this.searchInputValueChanges.subscribe(value=>{
        console.log(value);
      this.appService.getSearchBooks(value).subscribe(search=>this.appService.setSearchBooks(search.items));

      });

      

  }

  get searchInputControl(){
    return this.searchForm.get('searchInput');
}

get searchInputValueChanges(){
  return this.searchInputControl.valueChanges.pipe(debounceTime(100));
}

closeSearchBar() {
 
}


}
