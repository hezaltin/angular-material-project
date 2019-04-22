import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { RecordsDialogComponent } from 'src/app/shared/records-dialog/records-dialog.component';
import { AppserviceService } from 'src/app/service/appservice.service';


const RECORD_DATA = [ {fId: 1, chemId: '2', quantity: 3.21, materialName: 'PAPI 27',type:'polyol',index:0},
{fId: 1, chemId: '5', quantity: 6.22, materialName: 'PAPI 27',type:'polyol',index:1},
{fId: 1, chemId: '8', quantity: 9.22, materialName: 'PAPI 27',type:'polyol',index:2},
{fId: 1, chemId: '11', quantity: 12.33, materialName: 'PAPI 27',type:'polyol',index:3}
]

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css']
})
export class RecordsListComponent implements OnInit {

  displayedColumns: string[] = [ 'fId', 'chemId', 'quantity','materialName','type','action'];
  dataSource: MatTableDataSource<any>;
  dropdownListData: any = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
 
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog,private appService:AppserviceService) { 
    this.dataSource = new MatTableDataSource(RECORD_DATA);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.appService.setRecordsList(this.dataSource);

    this.appService.userRecordsList.subscribe(list=>{
        console.log(list)

        if(!list.length){
          return
        }
        console.log(list)
        this.dataSource = new MatTableDataSource(list);
        this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  onEditDialog(editRecord){
    console.log('chemId===>',editRecord)
    this.openDialog(editRecord);
  }

  openDialog(records): void {
    const dialogRef = this.dialog.open(RecordsDialogComponent, {
      width: '500px',
      data: {quantity: records.quantity, materialName: records.materialName,component:'recordList'}
    });

    dialogRef.afterClosed().subscribe(result => {
    
     if(!result){
       return
     }
     this.updateRecords({index:records.index,updatedRecords:result})

    });
  }

  updateRecords(records){
      let updateRecords = this.dataSource.data.reduce((all,item)=>{
          if(records.index==item.index){
              item.quantity = Number(records.updatedRecords.quantity);
              item.materialName = records.updatedRecords.materialName
          }
          all.push(item)
          return all;
      },[]);
      console.log(updateRecords)
       this.appService.setRecordsList(updateRecords);
  }


}
