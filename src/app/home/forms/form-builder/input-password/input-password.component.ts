import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent implements OnInit {

  @Input() json: any;
  
  constructor() { }

  ngOnInit() {
  }

}
