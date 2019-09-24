import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppserviceService } from 'src/app/service/appservice.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobTypeData: any = [
    {value: 'ftp', viewValue: 'FTP'},
    {value: 'http', viewValue: 'Http'},
  ];
  batchTypeData: any = [
    {value: 'single', viewValue: 'Single'},
    {value: 'double', viewValue: 'Double'},
    {value: 'triple', viewValue: 'Triple'},
    {value: 'quadruple', viewValue: 'Quadruple'}
  ];
  jobsForm:FormGroup;
  jobSubscription = new Subscription();
  getJobList:any=[];
  dialogData = {
    title:'Confirmation',
    content:'job has been submitted!!'
  }
  constructor(public dialog: MatDialog,private fb:FormBuilder,private appService:AppserviceService) { }

  ngOnInit() {
    this.jobsForm = this.jobsFormConfigGroup();
    console.log(this.jobTypeCode)
    const jobListObservable = this.appService.userJobsList.subscribe(jobList=>{
        this.getJobList = jobList
    })

    this.jobSubscription.add(jobListObservable);

  }

  onSelectionJobTypeChange(event){
    console.log('event==>',event)
      if(event.value!=='ftp'){
        this.batchTypeCode.enable();
        return
      }
      this.batchTypeCode.disable();
      this.batchTypeCode.patchValue('single');
  }
  get jobTypeCode() {
    return this.jobsForm.get("jobType") as FormControl;
  }
  get batchTypeCode() {
    return this.jobsForm.get("batchType") as FormControl;
  }

  jobsFormConfigGroup(){
    return this.fb.group({
      jobName :[''],
      jobType:['http'],
      batchType:['single'],
      email:['']
    })

  }

  jobsFromSubmit(jobsFormValues){
    console.log('jobsFormValues==>',jobsFormValues.getRawValue())
    let property = {...jobsFormValues.getRawValue(),timeStamp:new Date().valueOf()};
    console.log(property)
    this.getJobList.push(property);
    this.appService.setJobsList(this.getJobList);
    this.openDialog(this.dialogData);
  }

  openDialog(records): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {title: records.title, content: records.content}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result===>',result)
      this.jobsForm.reset(this.jobsFormConfigGroup().value);
    });
  }

  ngOnDestroy(){
    this.jobSubscription.unsubscribe();
  }


}
