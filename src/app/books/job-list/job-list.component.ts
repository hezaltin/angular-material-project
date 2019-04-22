import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { AppserviceService } from 'src/app/service/appservice.service';
import { RecordsDialogComponent } from 'src/app/shared/records-dialog/records-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  displayedColumns: string[] = [ 'batchType', 'email', 'jobName','jobType','timeStamp','action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  jobListSubscription = new Subscription();
  constructor(public dialog: MatDialog,private appService:AppserviceService) { }

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    // this.appService.setRecordsList(this.dataSource);

    const jobListObservable = this.appService.userJobsList.subscribe(list=>{
        console.log(list);
        this.dataSource = new MatTableDataSource(list);
        this.dataSource.sort = this.sort;
    });
    this.jobListSubscription.add(jobListObservable)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditDialog(editRecord){
    console.log('chemId===>',editRecord)
    this.openDialog(editRecord);
  }

  openDialog(records): void {
    const dialogRef = this.dialog.open(RecordsDialogComponent, {
      width: '500px',
      data: {email: records.email, jobName: records.jobName,component:'jobList'}
    });

    dialogRef.afterClosed().subscribe(result => {
    
     if(!result){
       return
     }
     this.updateRecords({timeStamp:records.timeStamp,updatedRecords:result})

    });
  }

  updateRecords(records){
      let updateRecords = this.dataSource.data.reduce((all,item)=>{
          if(records.timeStamp==item.timeStamp){
              item.email = (records.updatedRecords.email);
              item.jobName = records.updatedRecords.jobName
          }
          all.push(item)
          return all;
      },[]);
      console.log(updateRecords)
       this.appService.setJobsList(updateRecords);
  }


  ngOnDestroy(){
   this.jobListSubscription.unsubscribe();
  }

}
