import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes.routing.module';
import { TabViewComponent } from './views/tab-view/tab-view.component';
import { HeroesComponent } from './heroes.component';
import { NavigationComponent } from './views/navigation/navigation.component';
import { MatSidenavModule } from '@angular/material';
import { CrisisComponent } from './views/crisis/crisis.component';

@NgModule({
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MatSidenavModule
  ],
  declarations: [
    TabViewComponent,
    NavigationComponent,
    HeroesComponent,
    CrisisComponent
  ]
})
export class HeroesModule { }
