import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-my-book-list',
  templateUrl: './my-book-list.component.html',
  styleUrls: ['./my-book-list.component.css']
})
export class MyBookListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'cost','pagecount','language','action'];
  bookListData:any;
  loggedUserForMyList:any;
  loggedUserList:any;
  notes: string;
  name: string;

  constructor(private appService:AppserviceService,public dialog: MatDialog) { }

  ngOnInit() {
    this.appService.loggedUserState.subscribe(list=>{
      if(!list){
        return
      }
      this.loggedUserForMyList = list;
      this.loggedUserList = this.loggedUserForMyList.userCart.map(item=>item);
      this.appService.setUserCartList(this.loggedUserList);

    });

    const getUserCartListObservable = this.appService.userCartSavedList.subscribe(item=>{
      if(!item){
        this.bookListData = [];
        return
      }
      this.bookListData = this.bookListDataMake(item);
    })

    
  }

  bookListDataMake(userlist){
    if(userlist.length===0){
      return []
    }
    let userListData = userlist.reduce((all,item,index)=>{
          let getUsers = {
            name: item.volumeInfo.title,
            cost: item.saleInfo.listPrice.amount,
            pagecount :item.volumeInfo.pageCount,
            language :item.volumeInfo.language,
            position: index+1,
            id:item.id,
            index:index,
            notes:item.notes || ''
          }
         all.push(getUsers);
          return all
    },[])
    return userListData;
  }

  getTotalCost() {
    return this.bookListData.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  removeTocart(id){
    let getLocalDb = JSON.parse(localStorage.getItem('logindetails'));
    let getValidUser = this.iterateValidUser(getLocalDb,this.loggedUserForMyList);
    if(!getValidUser.validUser){
        return
    }

    getLocalDb[getValidUser.index].userCart =  getLocalDb[getValidUser.index].userCart.filter(bookId=>bookId.id!==id);
    this.appService.setUserCartList( getLocalDb[getValidUser.index].userCart);
    this.appService.setLoggedUser( getLocalDb[getValidUser.index]);
    localStorage.setItem('logindetails',JSON.stringify(getLocalDb));
  
  }

  updateNotes(bookNotes){
    let getLocalDb = JSON.parse(localStorage.getItem('logindetails'));
    let getValidUser = this.iterateValidUser(getLocalDb,this.loggedUserForMyList);
    if(!getValidUser.validUser){
        return
    }
    getLocalDb[getValidUser.index].userCart[bookNotes.index]['notes'] =  bookNotes.updatedNotes
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

  openDialog(bookData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {name: bookData.name, notes: bookData.notes}
    });

    dialogRef.afterClosed().subscribe(result => {
    
     if(!result){
       return
     }
     this.updateNotes({index:bookData.index,updatedNotes:result})

    });
  }


}
