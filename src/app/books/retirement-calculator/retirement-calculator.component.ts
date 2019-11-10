import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice.service';
import { Hero, heroes } from './hero';
// import { companyFacts } from '../../shared/shared-config/company.config';
// import { of } from 'rxjs';

@Component({
  selector: 'app-retirement-calculator',
  templateUrl: './retirement-calculator.component.html',
  styleUrls: ['./retirement-calculator.component.css']
})
export class RetirementCalculatorComponent implements OnInit {

  heroes = heroes;
  hero = this.heroes[0];
  showSad = true;
  
  trackById(index: number, hero: Hero): number { return hero.id; }
  constructor(private appService:AppserviceService) {
   
   }

  ngOnInit() {
   
  }


}
