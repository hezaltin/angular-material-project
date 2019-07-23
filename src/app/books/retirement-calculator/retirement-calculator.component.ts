import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice.service';
import { companyFacts } from '../../shared/shared-config/company.config';
import { of } from 'rxjs';

@Component({
  selector: 'app-retirement-calculator',
  templateUrl: './retirement-calculator.component.html',
  styleUrls: ['./retirement-calculator.component.css']
})
export class RetirementCalculatorComponent implements OnInit {

  editing = {};
  rows = [];
  constructor(private appService:AppserviceService) {
   
   }

  ngOnInit() {
    console.log('name==>',companyFacts)
    this.appService.getemployeeDetails().subscribe(employeeList=>{
      console.log('employeeList==>',employeeList)
    });
    // this.fetch((data) => {
    //   this.rows = data;
    //   setTimeout(() => { this.loadingIndicator = false; }, 1500);
    // });

    const subscriptionFormats = of(companyFacts).subscribe((next)=>{
      this.rows = next;
    })
    
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `../../shared/shared-config/company.json`);

  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };

  //   req.send();
  // }

}
