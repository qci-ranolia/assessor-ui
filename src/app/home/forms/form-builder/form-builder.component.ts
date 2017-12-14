import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../../service/ProjectService';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  jsonArray: any = [];
  formDetails: any = [];
  rules: any = [];
  act_data: any = [];
  flag: any;
  pos: any;
  display = false;

  constructor(private projectService: ProjectService) {
    this.projectService.emitFormElement.subscribe((res)=>{

      console.log(res);
      this.jsonArray = res.Elements;
      this.formDetails = res.Details;
      this.rules = res.Rules;
      this.display = true;
    });
  }

  ngOnInit() {
  }

  responseData(data: any) {
    console.log(data);
    this.flag = 0;
    this.pos = 0;

    for(let i =0; i <(this.act_data.length); i++) {

      if (this.act_data[i].cid === data.cid) {
        this.flag = 1;
        this.pos = i;
        break;
      }
    }

    if(this.flag == 1) {
        this.act_data[this.pos].value = data.value;
    }
    if(this.flag == 0) {
      this.act_data.push(data);
    }

    console.log(this.act_data);
  }

}
