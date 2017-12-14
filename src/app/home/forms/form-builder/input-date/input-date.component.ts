import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css']
})
export class InputDateComponent implements OnInit {

  @Input() json:any;
  @Input() id: any;
  @Output() responseData = new EventEmitter<any>();

  value: any;

  constructor() { }

  ngOnInit() {
  }

  funID(id) {
    return (parseInt(id)+1);
  }
  getVal() {
    this.json.value = this.value;
    this.responseData.emit(this.json);
  }
}
