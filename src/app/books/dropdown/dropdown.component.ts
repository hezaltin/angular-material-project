import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() dropdownList:any;
  @Input() dropdownLabel:any
  @Input() selectedTargetView:any
  @ViewChild('list') list: ElementRef;
  @ViewChild('dropdownSelect') dropdownSelect : ElementRef;
  @ViewChild('dropdownListNodes') dropdownListNodes : ElementRef;
  @HostListener("document:click", ["$event"])
  onclick(elemRef) {
    if (!this.dropdownSelect.nativeElement.contains(elemRef.target) ) {
      this.dropDownToggle = false
    }
  }

  dropDownToggle:boolean = false;
  selectdElement:string;
 
  constructor(private elementref: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // console.log(this.renderer)
    // console.log(this.dropdownListNodes.nativeElement.children);
    Promise.resolve(null).then(()=>{
      const childrenNodeList = this.dropdownListNodes.nativeElement.children
      const getSelectedChildNodes = this.getChildrenNodes(childrenNodeList,this.selectedTargetView)
      if(!getSelectedChildNodes){
        return
      }
      this.actionTrigered(getSelectedChildNodes,this.selectedTargetView)
    })
   
  }

  getChildrenNodes(childrenNodes,selectedView){
    if(childrenNodes.length == 0){
      return null;
    }
      let getIndex = this.dropdownList.reduce((list,item,index)=>{
        if(item.viewValue === selectedView.viewValue){
          list.index = index;
        }
        return list;
          
      },{
        index:0
      })
    return childrenNodes.item(getIndex.index)
  }

  actionTrigered(event,food){
    let eventTarget;
    if(event.target){
      eventTarget = event.target
    }
    else{
      eventTarget = event
    }
    console.log(eventTarget)
    let dropdownList = this.dropdownList
    for (let i = 0; i < dropdownList.length; i++) {
      if (dropdownList[i].viewValue == (eventTarget.innerHTML.trim())) {
        this.selectdElement = dropdownList[i].viewValue
        let selectedClass = eventTarget.parentNode.getElementsByClassName('same-as-selected')
        for (let k = 0; k < selectedClass.length; k++) {
          selectedClass[k].removeAttribute("class");
        }
        eventTarget.setAttribute("class", "same-as-selected");
        break;
      }
    }
    console.log(food)
  }

  toogledropdown(event){
    let eventTargetToogle = event.target
      event.stopPropagation();
      this.closeAllSelect();
      eventTargetToogle.nextSibling.classList.toggle("select-hide");
      eventTargetToogle.classList.toggle("select-arrow-active");
  }

  closeAllSelect() {
    this.dropDownToggle = !this.dropDownToggle
  }

}
