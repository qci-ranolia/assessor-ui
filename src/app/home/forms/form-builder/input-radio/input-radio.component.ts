import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.css']
})
export class InputRadioComponent implements OnInit {

  @Input() json:any;
  
  constructor() { }

  ngOnInit() {
  }

}
