import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private appService:AppserviceService) { }
  displayedColumns: string[] = ['position', 'name', 'email','action'];
  dataSource:any;
  ngOnInit() {
      const getUserListFromLocal = JSON.parse(localStorage.getItem('logindetails'));

      this.appService.setSearchUserList(getUserListFromLocal);
      this.dataSource = this.dataSourceMake(getUserListFromLocal);

      const getUserListObservable = this.appService.userList.subscribe(item=>{
        if(!item){
          this.dataSource = [];
          return
        }
        this.dataSource = this.dataSourceMake(item);
      })
  }
  
  dataSourceMake(userlist){
    if(userlist.length===0){
      return []
    }
    let userListData = userlist.reduce((all,item,index)=>{
          let getUsers = {
            name: item.name,
            email: item.email,
            position: index+1
          }
         all.push(getUsers);
          return all
    },[])
    return userListData;
  }

  onDelete(name){
    let getLocalUsers = JSON.parse(localStorage.getItem('logindetails'));
        let filterUsers = getLocalUsers.filter(user=> user.name!==name);
        let getFilter = filterUsers.length > 0 ? filterUsers : null;
        this.appService.setSearchUserList(getFilter);
        localStorage.setItem('logindetails',JSON.stringify(getFilter));

  }


}
