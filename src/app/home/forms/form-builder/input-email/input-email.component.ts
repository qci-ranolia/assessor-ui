import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.css']
})
export class InputEmailComponent implements OnInit {

  @Input() json:any;

  constructor() { }

  ngOnInit() {
  }

}
