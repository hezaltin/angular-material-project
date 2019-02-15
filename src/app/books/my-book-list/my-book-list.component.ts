import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice.service';

@Component({
  selector: 'app-my-book-list',
  templateUrl: './my-book-list.component.html',
  styleUrls: ['./my-book-list.component.css']
})
export class MyBookListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'preview','pagecount','language','action'];
  dataSource:any;
  loggedUserForMyList:any;
  loggedUserList:any;
  constructor(private appService:AppserviceService) { }

  ngOnInit() {
    
    this.appService.loggedUserState.subscribe(list=>{
      if(!list){
        return
      }
      console.log(list)
      this.loggedUserForMyList = list;
      this.loggedUserList = this.loggedUserForMyList.userCart.map(item=>item);
      this.appService.setUserCartList(this.loggedUserList);

    });

    const getUserCartListObservable = this.appService.userCartSavedList.subscribe(item=>{
      console.log(item);
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
            name: item.volumeInfo.title,
            preview: item.saleInfo.listPrice.amount,
            pagecount :item.volumeInfo.pageCount,
            language :item.volumeInfo.language,
            position: index+1,
            id:item.id
          }
         all.push(getUsers);
          return all
    },[])
    return userListData;
  }

  onDelete(name){
    console.log(name);

    // let getLocalUsers = JSON.parse(localStorage.getItem('logindetails'));
    //     let filterUsers = getLocalUsers.filter(user=> user.name!==name);
    //     let getFilter = filterUsers.length > 0 ? filterUsers : null;
    //     this.appService.setSearchUserList(getFilter);
    //     localStorage.setItem('logindetails',JSON.stringify(getFilter));

  }

  removeTocart(id){
   console.log(id)
    let getLocalDb = JSON.parse(localStorage.getItem('logindetails'));
    console.log(getLocalDb)
    let getValidUser = this.iterateValidUser(getLocalDb,this.loggedUserForMyList);
    if(!getValidUser.validUser){
        return
    }
    
    getLocalDb[getValidUser.index].userCart =  getLocalDb[getValidUser.index].userCart.filter(bookId=>bookId.id!==id);
    this.appService.setUserCartList( getLocalDb[getValidUser.index].userCart);
    this.appService.setLoggedUser( getLocalDb[getValidUser.index]);
    localStorage.setItem('logindetails',JSON.stringify(getLocalDb));
  
  }
  
  iterateValidUser(localDb,loggedUser){
    return localDb.reduce((user,item,index)=>{
          if(item.name===loggedUser.name){
              user.validUser= item;
              user.index = index;
          }
          return user;
    },{});
  }


}
