import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-preview',
  templateUrl: './search-preview.component.html',
  styleUrls: ['./search-preview.component.css']
})
export class SearchPreviewComponent implements OnInit {
  @Input() book: any;
  constructor() { }

  ngOnInit() {
  }

  get id() {
    return this.book.id;
  }

  get title() {
    return this.book.volumeInfo.title;
  }

  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get description() {
    return this.book.volumeInfo.description;
  }


}
