import { Component, OnInit } from '@angular/core';
import {AppserviceService} from '../../service/appservice.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  books:any;
  constructor(private appService:AppserviceService) { }

  ngOnInit() {
    this.appService.setSeatchOn(true);
    this.books = this.appService.searchBooks;
  }

}
