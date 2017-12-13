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

}
