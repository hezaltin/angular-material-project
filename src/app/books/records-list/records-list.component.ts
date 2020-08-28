import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecordsDialogComponent } from 'src/app/shared/records-dialog/records-dialog.component';
import { AppserviceService } from 'src/app/service/appservice.service';
import {data} from './record-list.config';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { OverlayTree } from 'src/app/service/overlayservice.service';
import { timezoneList, getTimeZoneLocale, InputDA } from './record-list.locale';


const RECORD_DATA = [ {fId: 1, chemId: '2', quantity: 3.21, materialName: 'PAPI 27', type: 'polyol', index: 0},
{fId: 1, chemId: '5', quantity: 6.22, materialName: 'PAPI 27', type: 'polyol', index: 1},
{fId: 1, chemId: '8', quantity: 9.22, materialName: 'PAPI 27', type: 'polyol', index: 2},
{fId: 1, chemId: '11', quantity: 12.33, materialName: 'PAPI 27', type: 'polyol', index: 3}
];

interface FoodNode {
  id: number;
  groups?: FoodNode[];
  isRootGroup: false;
level: number;
name: string;
parentID: number;
tenantID: number;
ucid: any;
dealerCode: any;
dealerCustomerNumber: any;
description: string;
}

const getConfigData = [...data];
const getDataFormat = data[0].groups.filter((item, index) => index < 100);
const setData = getConfigData.reduce((all, item, index) => {
  item.groups = getDataFormat;
  all.push(item);
  return all;
}, []);


@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css']
})
export class RecordsListComponent implements OnInit {
  constructor(public dialog: MatDialog, private appService: AppserviceService, private overlayService:OverlayTree) {
    this.dataSource.data = setData;
    // this.dataSource = new MatTableDataSource(RECORD_DATA);
  }

  displayedColumns: string[] = [ 'fId', 'chemId', 'quantity', 'materialName', 'type', 'action'];
 // dataSource: MatTableDataSource<any>;
  dropdownListData: any = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  treeControl = new NestedTreeControl<FoodNode>(node => node.groups);
  isOpen = false;
  node;
  overlayRef:any;

  @ViewChild(MatSort) sort: MatSort;
  hasChild = (_: number, node: FoodNode) => (!!node.groups && node.groups.length > 0);

  ngOnInit() {
    console.log(data);

    // this.dataSource.sort = this.sort;
    // this.appService.setRecordsList(this.dataSource);
    console.log(setData);
        console.log(getDataFormat);
    this.appService.userRecordsList.subscribe(list => {
        if (!list.length) {
          return;
        }
        console.log(list);
        // this.dataSource = new MatTableDataSource(list);
        // this.dataSource.sort = this.sort;
    });
    console.log(this.getLatestLocale(InputDA))
  }

  addNewItem(node) {
    console.log(node);
    this.node = node.id
  }
  backdropClick(){
    this.isOpen = !this.isOpen
  }
  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  onEditDialog(editRecord) {
    console.log('chemId===>', editRecord);
    this.openDialog(editRecord);
  }

  openDialog(records): void {
    const dialogRef = this.dialog.open(RecordsDialogComponent, {
      width: '500px',
      data: {quantity: records.quantity, materialName: records.materialName, component: 'recordList'}
    });

    dialogRef.afterClosed().subscribe(result => {

     if (!result) {
       return;
     }
    // this.updateRecords({index:records.index,updatedRecords:result})

    });
  }

  updateRecords(records) {
      // let updateRecords = this.dataSource.data.reduce((all,item)=>{
      //     if(records.index==item.index){
      //         item.quantity = Number(records.updatedRecords.quantity);
      //         item.materialName = records.updatedRecords.materialName
      //     }
      //     all.push(item)
      //     return all;
      // },[]);
     // console.log(updateRecords)
      // this.appService.setRecordsList(updateRecords);
  }

  show(content: TemplateRef<any>, origin){

    this.overlayRef = this.overlayService.open<{ skills: number[] }>({
      origin,
     // content,
      content: 'Hello world!',
      // content: InsidePopoverComponent,
      data: {
        skills: [1, 2, 3]
      },
      width: '300px',
      height:'auto',
    });
    this.overlayRef.afterClosed$.subscribe(res => console.log(res));

  }
  treeClick(){
    console.log('data')
    this.overlayRef.close()
  }
//Navie soln Multiple pointer
  setTheTranslateKeysPointers(baseLocale,list){
    let start = 0;
    let end = 0;
    const getEntries = Object.entries(baseLocale);
    //console.log(getEntries)
    while(start<list.length){
      if(list[start]['displayName']===getEntries[end][1]){
        list[start]['translate'] = getEntries[end][0];
        start++
        end = 0;
      }
      else if(end=== list.length-1){
        start++
        end = 0;
      }
      else{
        end++;
      }
    }
    console.log(list)
  }

  //O(N) => O(3N) => O(N)
  setTheTranslateKeyFrequency(baseLocale,list){
    let baseList = {};
    let listValue = [];
    const getEntries:any = Object.entries(baseLocale);
    //console.log(getEntries)
    for(const forValues of getEntries ){
      baseList[forValues[1]] = forValues[0]
    }
    for(const timezoneKey of list){
      listValue.push({...timezoneKey,translate:baseList[timezoneKey['displayName']]}) 
    }
   // console.log(list)
   //console.log(listValue.filter(name=>!name.translate));
   return listValue;
   
  }

  getLatestLocale(localeInput){
    let modifiedObject = {};
    const gettranslatedBaseObject = this.setTheTranslateKeyFrequency(getTimeZoneLocale,timezoneList);
    for(const getObj of gettranslatedBaseObject){
      modifiedObject[getObj['displayName']] = localeInput[getObj['translate']];
    }
    console.log(JSON.stringify(modifiedObject))
    return modifiedObject;
  }




}
