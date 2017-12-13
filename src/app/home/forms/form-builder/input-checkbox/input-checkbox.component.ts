import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.css']
})
export class InputCheckboxComponent implements OnInit {

  @Input() json:any;
  
  constructor() { }

  ngOnInit() {
  }

}
