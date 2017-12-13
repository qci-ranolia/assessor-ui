import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css']
})
export class InputDateComponent implements OnInit {

  @Input() json:any;
  
  constructor() { }

  ngOnInit() {
  }

}
