import { Routes, RouterModule } from "@angular/router";
import { HeroesComponent } from "./heroes.component";
import { NgModule } from "@angular/core";
import { TabViewComponent } from "./views/tab-view/tab-view.component";
import { NavigationComponent } from "./views/navigation/navigation.component";
import { CrisisComponent } from "./views/crisis/crisis.component";

const heroesRoutes: Routes = [
    {
        path: '',
        component: HeroesComponent,
        children: [
            {
                path: '',
                component: NavigationComponent,  
                outlet:'aside'
            },
            {
                path: 'tab1',
                component: TabViewComponent
            },
            
            {
                path: 'crisis',
                component: CrisisComponent,
            }


        ]
    }

];


@NgModule({
    imports: [
        RouterModule.forChild(heroesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class HeroesRoutingModule { }