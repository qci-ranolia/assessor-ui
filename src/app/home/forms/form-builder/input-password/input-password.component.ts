import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent implements OnInit {

  @Input() json: any;
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
