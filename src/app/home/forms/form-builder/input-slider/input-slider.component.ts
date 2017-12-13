import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-slider',
  templateUrl: './input-slider.component.html',
  styleUrls: ['./input-slider.component.css']
})
export class InputSliderComponent implements OnInit {

  @Input() json:any;
  
  constructor() { }

  ngOnInit() {
  }

}
