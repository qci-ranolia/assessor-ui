import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.css']
})
export class InputTextareaComponent implements OnInit {

  @Input() json:any;

  constructor() { }

  ngOnInit() {
  }

}
