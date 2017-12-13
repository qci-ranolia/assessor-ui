import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-input-break',
  templateUrl: './input-break.component.html',
  styleUrls: ['./input-break.component.css']
})
export class InputBreakComponent implements OnInit {

  @Input() json:any;
  constructor() { }

  ngOnInit() {
  }

}
