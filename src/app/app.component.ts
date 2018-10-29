import { Component, ChangeDetectorRef, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";


const filterCheck = [{ name: 'plant', value: [{ "id": "1020", "makeSerialNumber": "CAT1|Plant003" }, { "id": "Plant1", "makeSerialNumber": "Make01|Serial01" }, { "id": "Plant2", "makeSerialNumber": "Make02|Serial02" }, { "id": "intPlants786", "makeSerialNumber": "Z93|18071000G005003K6" }] },

{ name: 'paver', value: [{ "id": "FINALPaver01", "makeSerialNumber": "CAT|Paver001" }]},{ name: 'board', value: [{ "id": "FINALBoard01", "makeSerialNumber": "CAT|Board001" }]}]

const selected = [{ "id": "1020", "makeSerialNumber": "CAT1|Plant003" },{ "id": "FINALPaver01", "makeSerialNumber": "CAT|Paver001" }]

const resetChecked = false;
const setAllChecked = true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent {
  filterData: any;
  filterForm: any;
  @ViewChildren('changePlant') elementAll : QueryList<ElementRef>;
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {

  }
  ngOnInit() {
    this.filterData = filterCheck;
    this.filterForm = this.createFilterForm(this.filterData);
    console.log(this.filterForm)
    for(let i=0;i<this.filterData.length;i++){
      this.generateData(this.filterData[i].value, this.filterData[i].name)
    }
    console.log(this.filterForm)
    console.log(this.filterData);
  }

  addPlant(object) {
    console.log(object.name)
   // let selectedFilter = this.getSelectedValues(object.name)
    let getselectedObject = this.filterValue(object.data.id,selected)
    console.log(getselectedObject)
    if(getselectedObject){
      object.checked = true;
    }
    this.filterForm.get(object.name).push(this.fb.control(object));
    if(this.elementAll){
      let selectedValue = this.selectedAllEnabled(object.name)
    if(!selectedValue){
      return
    }
      this.selectedCheckBoxAll(object.name)[0]['checked']=true;
    }
    

    console.log('this.filterForm==>',this.filterForm.get(object.name))
  }

  addRemovePlant(index, checked,fieldName) {
    this.filterForm.get(fieldName).controls[index].value.checked = checked;
    let selectedValue = this.selectedAllEnabled(fieldName)
    if(!selectedValue){
      return
    }
    this.selectedCheckBoxAll(fieldName)[0]['checked']=true
    console.log(index)
  }

  generateData(filter, key) {
    console.log(key)
      this.getOperationPlant(filter, resetChecked,key)
  }

  getOperationPlant(value, setChecked,fieldName) {
    for (let i = 0; i < value.length; i++) {
      this.addPlant({ data: value[i], checked: setChecked, name: fieldName })
    }
  }

  changePlantAll(event,fieldName) {
    if (event.checked) {
      this.getplantChanged(setAllChecked,fieldName);
    }
    else {
      this.getplantChanged(resetChecked,fieldName);
    }
    console.log(this.filterForm)
  }
  
  getplantChanged(checked,name) {
    for (let index = 0; index <  this.filterForm.get(name).controls.length; index++) {
      this.filterForm.get(name).controls[index].value.checked = checked
    }
  }

  changeId(event, id, index) {
      this.addRemovePlant(index, event.checked,id.name);
  }

  submitFilter(filterform) {
    console.log(filterform)
    let reduceValue = Object.keys(filterform.controls).reduce((all,item,ind)=>{
        let itemValue=  filterform.get(item).value.filter(item=>item.checked ===true);
        console.log(itemValue)
        if(itemValue.length){
          console.log('length')
         all.push(itemValue)
        }
        return all
    },[]);
    let concatArray = [].concat(...reduceValue).map(item=>item.data);

      console.log(concatArray)
  }

  resetFilter() {
    console.log('filterform');
    console.log(this.elementAll.map(item=>item));
    this.checkboxAll.forEach(item=>item['checked'] = false);
  for(let i=0;i<this.filterData.length;i++){
    this.getplantChanged(resetChecked,this.filterData[i].name);
  }
  }

  get checkboxAll(){
    let getAllCheckBoxList = this.elementAll.map(item=>item);
    return getAllCheckBoxList;
  }

  selectedCheckBoxAll(fieldName){
    let filteredCheckBox = this.checkboxAll.filter(item=>item['id']===fieldName);
    return filteredCheckBox;
  }

  selectedAllEnabled(fieldName){
   let filteredValue =  this.filterForm.get(fieldName).controls.filter(item=>item.value.checked === true);
   return filteredValue.length === this.filterForm.get(fieldName).controls.length ? true :false;
  }
  
  filterValue(id,dataValue){
    let filter = dataValue.filter(item=>item.id===id);
    return filter.length===0 ? false : true;
  }

  createFilterForm(filterData) {
   let controls = this.fb.group([])
    for(let i=0;i<filterData.length;i++){
      console.log(filterData[i].name)
      let filterName = filterData[i].name
      controls.addControl( filterName, this.fb.array([]));
    }
    return controls;
  }

}
