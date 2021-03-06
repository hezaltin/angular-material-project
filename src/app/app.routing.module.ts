import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

 import {SearchComponent} from './books/search/search.component';
// import {PostCreateComponent} from './posts/post-create/post-create.component';
 import {LoginComponent} from './auth/login/login.component';
 import {SignupComponent} from './auth/signup/signup.component';
import { UserListComponent } from './books/user-list/user-list.component';
import { MyBookListComponent } from './books/my-book-list/my-book-list.component';
import { RetirementCalculatorComponent } from './books/retirement-calculator/retirement-calculator.component';
import { RecordsListComponent } from './books/records-list/records-list.component';
import { JobsComponent } from './books/jobs/jobs.component';
import { JobListComponent } from './books/job-list/job-list.component';
import { CrisisComponent } from './heroes/views/crisis/crisis.component';

const routes:Routes = [
    {path: 'name' , component:LoginComponent},
    {path: 'login' , component:LoginComponent},
     {path: 'search' , component:SearchComponent},
    // {path: 'create' , component:PostCreateComponent},
  
     {path: 'signup' , component:SignupComponent},
     {path: 'userlist' , component:UserListComponent},
     {path: 'mybooklist' , component:MyBookListComponent},
     {path:'retirement', component: RetirementCalculatorComponent},
     {path:'records', component: RecordsListComponent},
     {path:'job', component: JobsComponent},
    // {path:'crisis-center', component: CrisisComponent},
     {path:'joblist', component: JobListComponent},
     {
        path: '',
        loadChildren: () => import('./heroes/heroes.module').then(mod => mod.HeroesModule),
        data: { preload: true }
      },
     
    // {path: 'edit/:postId' , component:PostCreateComponent}
]

@NgModule({
    declarations :[],
    imports :[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers :[]
})

export class AppROutingModule{}