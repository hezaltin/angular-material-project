import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice.service';

@Component({
  selector: 'app-retirement-calculator',
  templateUrl: './retirement-calculator.component.html',
  styleUrls: ['./retirement-calculator.component.css']
})
export class RetirementCalculatorComponent implements OnInit {

  constructor(private appService:AppserviceService) { }

  ngOnInit() {
    this.appService.getemployeeDetails().subscribe(employeeList=>{
      console.log('employeeList==>',employeeList)
    })
  }

}
