import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-records-dialog',
  templateUrl: './records-dialog.component.html',
  styleUrls: ['./records-dialog.component.css']
})
export class RecordsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RecordsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
