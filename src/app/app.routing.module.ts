import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

 import {SearchComponent} from './books/search/search.component';
// import {PostCreateComponent} from './posts/post-create/post-create.component';
 import {LoginComponent} from './auth/login/login.component';
 import {SignupComponent} from './auth/signup/signup.component';

const routes:Routes = [
    {path: '' , component:LoginComponent},
    {path: 'login' , component:LoginComponent},
     {path: 'search' , component:SearchComponent},
    // {path: 'create' , component:PostCreateComponent},
  
     {path: 'signup' , component:SignupComponent},
     
    // {path: 'edit/:postId' , component:PostCreateComponent}
]

@NgModule({
    declarations :[],
    imports :[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers :[]
})

export class AppROutingModule{}