import { Component, OnInit } from '@angular/core';
import {AppserviceService} from '../../service/appservice.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment-timezone';
import {timeZoneList} from './search-timezone.config'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  books: any;
  private searchForm: FormGroup;
  private loggedUser: any;
  private loggedUserList: any;
  public momentTimzoneNames :any;
  date = new FormControl(new Date());
  previousValue = 'Asia/Calcutta' ;
  prevTime = {
    hour:moment().hour(),
    minute:moment().minute(),
    seconds:moment().seconds()
  }
  format:any;
  constructor(private appService: AppserviceService, private fb: FormBuilder) { }

  ngOnInit() {
    console.log(moment.tz.names());
    this.momentTimzoneNames = timeZoneList
   // this.momentTimzoneNames = moment.tz.names();
    this.appService.setSeatchOn(true);
    this.books = this.appService.searchBooks;
    this.searchForm = this.fb.group({
      searchInput: ['']
    });
    this.searchInputValueChanges.subscribe(value => {
    this.appService.getSearchBooks(value).subscribe(search => this.appService.setSearchBooks(search.items));

    });
    this.appService.loggedUserState.subscribe(list => {
      if (!list) {
        return;
      }
      this.loggedUser = list;
      this.loggedUserList = this.loggedUser.userCart.map(item => item.id);
    });
  }

  selectedZone(zoneEvent){
    let setvalues  = moment(this.date.value)
    console.log(new Date(setvalues))
    let names = moment.tz(setvalues, moment.tz.guess());
    console.log('names==>',names);

    var input = moment.tz(setvalues,this.previousValue).format('YYYY-MM-DDThh:mm:ss')
    var fmt   = "YYYY-MM-DDThh:mm:ss";
    //let addedTimeZone = moment(setvalues).tz(zoneEvent.value).format(fmt);
    let addedTimeZone = names.clone().tz(zoneEvent.value)
   let name =  moment.tz(input, fmt, zoneEvent.value).utc().format(fmt);
   console.log('UtC TimeZone==>',name)
   console.log('addedTimeZone==>',addedTimeZone)

   console.log(moment(addedTimeZone).hour())
   console.log(moment(addedTimeZone).minute())
   console.log(moment(addedTimeZone).seconds())
    this.format = addedTimeZone
   ;

   console.log(new Date (moment(addedTimeZone).local()))
   this.date.setValue(new Date (moment(addedTimeZone).local()));
   
   this.previousValue = zoneEvent.value;
   this.prevTime = {
     hour: moment(addedTimeZone).hour(),
     minute:moment(addedTimeZone).minute(),
     seconds:moment(addedTimeZone).seconds()
   }
  }


get searchInputControl() {
    return this.searchForm.get('searchInput');
}

get searchInputValueChanges() {
  return this.searchInputControl.valueChanges.pipe(debounceTime(100));
}

// get loggedUserCart(){
//   return this.loggedUser.userCart.map(item=>item.id);
// }

isAddtoCart(book) {
  return this.loggedUserList.indexOf(book.id) === (-1) ? true : false;
}


closeSearchBar() {

}

addTocart(event, book) {
  const getLocalDb = JSON.parse(localStorage.getItem('logindetails'));
  const getValidUser = this.iterateValidUser(getLocalDb, this.loggedUser);
  if (!getValidUser.validUser) {
      return;
  }
  event.srcElement.disabled = true;
  getLocalDb[getValidUser.index].userCart.push(book);
  this.appService.setLoggedUser( getLocalDb[getValidUser.index]);
  localStorage.setItem('logindetails', JSON.stringify(getLocalDb));

}

iterateValidUser(localDb, loggedUser) {
  return localDb.reduce((user, item, index) => {
        if (item.name === loggedUser.name) {
            user.validUser = item;
            user.index = index;
        }
        return user;
  }, {});
}

}
