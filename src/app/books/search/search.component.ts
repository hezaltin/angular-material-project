import { Component, OnInit } from '@angular/core';
import {AppserviceService} from '../../service/appservice.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import * as moment from 'moment-timezone';
import {timeZoneList, UNIVERSAL_TIME_ZONE, UNIVERSAL_TIME_ZONE_ERTS, WOA_UNIVERSAL_TIME_ZONE, groupArray, lineItems, TIMEZONE_API} from './search-timezone.config';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { findOneIana, findWindows } from 'windows-iana';
import { TIMEZONELATEST } from './search-timezone-config';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class SearchComponent implements OnInit {
  books: any;
  public searchForm: FormGroup;
  public loggedUser: any;
  public loggedUserList: any;
  public momentTimzoneNames: any;
  date = new FormControl(new Date());
  nativeChanged = new Date();
  previousValue = 'Asia/Calcutta' ;
  prevTime = {
    hour: moment().hour(),
    minute: moment().minute(),
    seconds: moment().seconds()
  };
  format: any;
  constructor(private appService: AppserviceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.momentTimzoneNames = TIMEZONELATEST;
    const getNames = this.momentTimzoneNames.map(item=>{
      const result = findOneIana(item.Id);
      return {...item,timezone:result};
    });
    console.log('getNames==>',getNames)
    const filters = getNames.filter(item=>{
      return !item.timezone
    })
    console.log('filters===>',JSON.stringify(filters))
    console.log(groupArray);
    console.log(lineItems);
    const makeRecursive = this.makingRecursive(lineItems, groupArray);
    console.log('makeRecursive==>', makeRecursive);
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

    const daylightSavingDate = '2019-03-10';

    const naes = UNIVERSAL_TIME_ZONE.map((item, index) => {
      return item['zoneutc'] = `${moment(daylightSavingDate).tz(item.timezone).format('Z')}--${item.displayName}`;
    });
  }

  makingRecursive(lineItems, groupArray) {
    const returnOriginalArray = lineItems.reduce((groupall, groupitem, groupindex) => {
        if (groupitem.lineItemGroups.length) {
            const getlineItemGroupsArray = groupitem.lineItemGroups.reduce((alllineItem, lineitem, indexlinItem) => {
              if (lineitem.lineItems.length) {
                const mapping = lineitem.lineItems.map((mappingitem, index) => {
                  const getDeepLineItems = mappingitem.lineItems[0];
                  const getMappingWithGroupArray = this.mappingWithGroupingArray(getDeepLineItems, groupArray);
                  if (getMappingWithGroupArray.ShowCategory !== (-1)) {
                    mappingitem.lineItems[0]['shipmentGroup'] = getMappingWithGroupArray.ShowCategory;
                  }
                  return mappingitem;
                });
                alllineItem.lineItemGroups[indexlinItem] = mapping;
                return alllineItem;
              }
            }, {...groupitem});

            groupall.push(getlineItemGroupsArray);
        }
        return groupall;
    }, []);
    return returnOriginalArray;
  }

  mappingWithGroupingArray(getDeepLineItems: { zProductNumber: any; sourceType: any; }, groupArray: any[]) {
    const getGroupsMatchedArray = (groupArray || []).reduce((mapall, mapitem, mapindex) => {
      const findItem = mapitem.find((finditem: { zProductNumber: any; sourceType: any; }) => {
        return finditem.zProductNumber === getDeepLineItems.zProductNumber && finditem.sourceType === getDeepLineItems.sourceType;
      });
      if (findItem) {
        mapall.categoryIndex = mapindex;
        mapall.matchedObject = findItem;
        mapall.ShowCategory = mapindex + 1;
      }
      return mapall;
    }, {ShowCategory: -1, categoryIndex: -1, matchedObject: null});
    return getGroupsMatchedArray;
  }

  formatFunc($event) {
    this.nativeChanged = moment($event.value);
  }

  selectedZone(zoneEvent) {
    console.log(zoneEvent);
    const setvalues  = moment(this.nativeChanged);
    const names = moment.tz(setvalues, moment.tz.guess());

    const result = findOneIana(zoneEvent.value.standardName);
console.log(result);

const resultWin = findWindows(result);
console.log(resultWin); // Eastern Standard Time

    let input = moment.tz(setvalues, this.previousValue).format('YYYY-MM-DDThh:mm:ss');
    let fmt   = 'YYYY-MM-DDThh:mm:ss';
    // let addedTimeZone = moment(setvalues).tz(zoneEvent.value).format(fmt);
    const addedTimeZone = names.clone().tz(zoneEvent.value.timezone);
   const name =  moment.tz(input, fmt, zoneEvent.value.timezone).utc().format(fmt);
    this.format = addedTimeZone
   ;

   this.date.setValue(moment([moment(addedTimeZone).year(), moment(addedTimeZone).month(), moment(addedTimeZone).date()]));

   this.previousValue = zoneEvent.value.timezone;
   this.prevTime = {
     hour: moment(addedTimeZone).hour(),
     minute: moment(addedTimeZone).minute(),
     seconds: moment(addedTimeZone).seconds()
   };
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
