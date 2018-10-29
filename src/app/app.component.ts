import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

const filterCheck = [
  { name: 'plant', value: [{ "id": "1020", "makeSerialNumber": "CAT1|Plant003" }, { "id": "Plant1", "makeSerialNumber": "Make01|Serial01" }, { "id": "Plant2", "makeSerialNumber": "Make02|Serial02" }, { "id": "intPlants786", "makeSerialNumber": "Z93|18071000G005003K6" }] },
{ name: 'paver', value: [{ "id": "FINALPaver01", "makeSerialNumber": "CAT|Paver001" }] }, 
{ name: 'board', value: [{ "id": "FINALBoard01", "makeSerialNumber": "CAT|Board001" }] },
{ name: 'algorithm', value: [{ "id": "FINALAlgorithm01", "makeSerialNumber": "CAT|Board001" }] }
]

const selected = [{ "id": "1020", "makeSerialNumber": "CAT1|Plant003" },, { "id": "Plant1", "makeSerialNumber": "Make01|Serial01" }, { "id": "Plant2", "makeSerialNumber": "Make02|Serial02" }, { "id": "intPlants786", "makeSerialNumber": "Z93|18071000G005003K6" }, { "id": "FINALPaver01", "makeSerialNumber": "CAT|Paver001" }]

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
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {

  }
  ngOnInit() {
    this.filterData = filterCheck;
    this.filterForm = this.createFilterForm(this.filterData);
    this.filterData.map((element, key) => {
      this.checkboxAll.push(this.fb.control({ checked: false, name: this.filterData[key].name }));
      return element;
    }).forEach(element => {
      this.initiateFilterFormValues(element.value, element.name);
    });
  }
  get checkboxAll() {
    return this.filterForm.get('checkboxAll') as FormArray;
  }

  initialCheckBoxRender(object) {
    let getselectedObject = this.extractValuesFromSelected(object.data.id, selected);
    if (getselectedObject) {
      object.checked = true;
    }
    this.filterForm.get(object.name).push(this.fb.control(object));
  }

  addRemoveFilterCheckBox(index, checked, fieldName) {
    this.filterForm.get(fieldName).controls[index].value.checked = checked;
    this.checkSelectedCheckboxAll(fieldName);
  }

  initiateFilterFormValues(filter, key) {
    this.setFilterValues(filter, resetChecked, key);
  }

  setFilterValues(value, setChecked, fieldName) {
    value.forEach(filterData => {
      this.initialCheckBoxRender({ data: filterData, checked: setChecked, name: fieldName })
    }); 
    this.checkSelectedCheckboxAll(fieldName);
  }

  checkSelectedCheckboxAll(fieldName){
    let selectedValue = this.checkBoxAllComparer(fieldName);
    //console.log(fieldName, selectedValue)
    if (!selectedValue) {
      this.extractCheckBoxAllWIthName(fieldName)[0].value.checked = false;
      return
    }
    this.extractCheckBoxAllWIthName(fieldName)[0].value.checked = true;
    //console.log(this.filterForm.get('checkboxAll'))
  }


  changePlantAll(event, fieldName,index) {
    this.checkboxAll.controls[index].value.checked = event.checked
    if (event.checked) {
      this.getplantChanged(setAllChecked, fieldName);
    }
    else {
      this.getplantChanged(resetChecked, fieldName);
    }
  }

  getplantChanged(checked, name) {
    for (let index = 0; index < this.filterForm.get(name).controls.length; index++) {
      this.filterForm.get(name).controls[index].value.checked = checked
    }
  }

  changeId(event, id, index) {
    this.addRemoveFilterCheckBox(index, event.checked, id.name);
  }

  submitFilter(filterform) {
    let {checkboxAll,...formObject} =  filterform.controls;
    //console.log(formObject)
    let reduceValue = Object.keys(formObject).reduce((all, item) => {
      let itemValue = filterform.get(item).value.filter(item => item.checked === true);
      if (itemValue.length) {
        all.push(itemValue)
      }
      return all
    }, []);
    let concatArray = [].concat(...reduceValue).map(item => item.data);
    //console.log(concatArray)
  }

  resetFilter() {
    this.checkboxAll.controls.forEach(elem => elem.value.checked = false)
    for (let i = 0; i < this.filterData.length; i++) {
      this.getplantChanged(resetChecked, this.filterData[i].name);
    }
  }

 

  extractCheckBoxAllWIthName(fieldName) {
    let filteredCheckBox = this.checkboxAll.controls.filter(item => item.value.name === fieldName);
    //console.log('filteredCheckBox===>',filteredCheckBox)
    return filteredCheckBox;
  }

  checkBoxAllComparer(fieldName) {
    let filteredValue = this.filterForm.get(fieldName).controls.filter(item => item.value.checked === true);
    // console.log('filteredValue===>', filteredValue);
    // console.log(this.filterForm.get(fieldName).controls)
    return filteredValue.length === this.filterForm.get(fieldName).controls.length ? true : false;
  }

  extractValuesFromSelected(id, dataValue) {
    let filter = dataValue.filter(item => item.id === id);
    return filter.length === 0 ? false : true;
  }

  createFilterForm(filterData) {
    let controls = this.fb.group([]);
    controls.addControl('checkboxAll', this.fb.array([]));
    for (let i = 0; i < filterData.length; i++) {
      let filterName = filterData[i].name;
      controls.addControl(filterName, this.fb.array([]));

    }
    return controls;
  }

}
