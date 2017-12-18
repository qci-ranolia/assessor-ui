import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import './allscript.js';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {

  @Input() json:any;
  @Input() id: any;
  @Output() responseData = new EventEmitter<any>();
  formData = new FormData();;
  files: any;
  selectedValue: any;
  name: any;

  constructor() { }

  ngOnInit() {
  }

  funID(id) {
    return (parseInt(id)+1);
  }

  getVal($event) {

    // console.log('1');
    this.formData.delete('file');
    this.files = $event.target.files || $event.srcElement.files;
    let file = this.files[0];
    let fileName = file.name;
    this.name = file.name;
    this.formData = new FormData();
    this.formData.append('file', file);
    // console.log(this.formData);

    this.json.value = this.formData;
    this.json.fileName = this.name;
    this.responseData.emit(this.json);
    // this.jsonData.emit({ 'id':this.id, 'name':this.name, 'value':this.formData, 'fileName':fileName});

  }

}
