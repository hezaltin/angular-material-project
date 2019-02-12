import { Validators, FormGroup, FormControl } from "@angular/forms";

const getLocalUsers = JSON.parse(localStorage.getItem('logindetails'))
const getLocalData = getLocalUsers ? getLocalUsers : [];

const getNameLoginDetails = getLocalData.map(user=>user.name);
const getEmailLoginDetails = getLocalData.map(user=>user.email);
export class CustoumValidators extends Validators{

   
    static nameValidators(control:FormControl):Validators{
        console.log(control)
      return getNameLoginDetails.indexOf(control.value) !== (-1)  ? {name:true} : null;
    }

    static emailValidators(control:FormControl):Validators{
        return getEmailLoginDetails.indexOf(control.value) !== (-1) ? {email:true} : null;
      }
  
    // static groupValidators(control:FormGroup):Validators{
    //   console.log('control===>',control)
    //   return  null;
    // }
    
  }