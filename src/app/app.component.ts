import { Component, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AppserviceService } from './service/appservice.service';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  title = 'app'
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef,public dialog: MatDialog,private appService:AppserviceService) {

  }
  ngOnInit() {
   this.appService.userList.subscribe(next=>next)
  }

  
}
