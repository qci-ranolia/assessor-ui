import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.css']
})
export class InputCheckboxComponent implements OnInit {

  @Input() json:any;
  @Input() id:any;
  @Output() responseData = new EventEmitter<any>();
  resultArray: any = [];

  constructor() { }

  checkVal(opt) {
    let flg = false;

    for(let j=0; j<this.json.values.length; j++) {
      if(opt == this.json.values[j]) {
          flg = true;
      }
    }

    if(flg) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.json.value = this.json.values;
    this.resultArray= this.json.values;
  }

  funID(id) {
    return (parseInt(id)+1);
  }

  getVal(flag, opt) {
    let temp = 0;
    let pos = 0;
    if(flag) {

      for(let i=0; i<= this.resultArray.length; i++) {
        if(this.resultArray[i] == opt) {
          temp = 1;
        }
      }

      if(temp == 0) {
        this.resultArray.push(opt);
      }

      // console.log(this.resultArray);
    } else {

      for(let i=0; i<= this.resultArray.length; i++) {
        if(this.resultArray[i] == opt) {
          pos = i;
          break;
        }
      }

      this.resultArray.splice(pos,1);
      // console.log(this.resultArray);
    }

    this.json.value = this.resultArray;
    this.responseData.emit(this.json);

  }
}
