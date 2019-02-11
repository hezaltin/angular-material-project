import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  private _isSearchAvailable: BehaviorSubject<any> = new BehaviorSubject(false);
  private _searchBooks: BehaviorSubject<any> = new BehaviorSubject([])
  constructor(private http:HttpClient) {

   }

   setSeatchOn(state){
     this._isSearchAvailable.next(state);
   }

   getSearchBooks(search):Observable<any>{
     console.log(search)
     const bookSearch = encodeURI("https://www.googleapis.com/books/v1/volumes?q="+search +"&maxResults=12")
     console.log(bookSearch)
      return this.http.get(bookSearch);
   }

    setSearchBooks(books){
      this._searchBooks.next(books)
    }
   

    get isSearchAvailable(){
      return this._isSearchAvailable.asObservable();
    }

    get searchBooks(){
      return this._searchBooks.asObservable();
    }


}
