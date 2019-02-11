import { Component, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef,public dialog: MatDialog) {

  }
  ngOnInit() {
   
  }

  
}
