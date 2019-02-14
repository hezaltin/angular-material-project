import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

 import {SearchComponent} from './books/search/search.component';
// import {PostCreateComponent} from './posts/post-create/post-create.component';
 import {LoginComponent} from './auth/login/login.component';
 import {SignupComponent} from './auth/signup/signup.component';
import { UserListComponent } from './books/user-list/user-list.component';
import { MyBookListComponent } from './books/my-book-list/my-book-list.component';

const routes:Routes = [
    {path: 'login' , component:LoginComponent},
    {path: 'login' , component:LoginComponent},
     {path: '' , component:SearchComponent},
    // {path: 'create' , component:PostCreateComponent},
  
     {path: 'signup' , component:SignupComponent},
     {path: 'userlist' , component:UserListComponent},
     {path: 'mybooklist' , component:MyBookListComponent},
     
    // {path: 'edit/:postId' , component:PostCreateComponent}
]

@NgModule({
    declarations :[],
    imports :[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers :[]
})

export class AppROutingModule{}