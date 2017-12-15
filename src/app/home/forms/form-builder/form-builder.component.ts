import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../service/ProjectService';
import './allscript.js';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  jsonArray: any = [];
  formDetails: any = [];
  rules: any = [];
  act_data: any = [];
  flag: any;
  pos: any;
  display = false;
  formError = false;

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
        this.checkError(data);
    }
    if(this.flag == 0) {
      this.act_data.push(data);
      this.checkError(data);
    }

    console.log(this.act_data);
  }

  checkError(data) {

    if(data.required && data.value == "") {

      for(let i = 0 ; i<= this.jsonArray.length; i++) {

        if(this.jsonArray[i].cid === data.cid) {
          this.jsonArray[i].errorMsg = "This feild can't be empty, please provide a valid input!";
          this.formError = true;
          // console.log(data.cid);
          // console.log(this.formError);
          break;
        }
      }
    } else {

      for(let i = 0; i<= this.jsonArray.length; i++) {
          if(data.required && data.value != "") {

            for(let j= 0; j<= this.jsonArray.length; j++) {

              if(this.jsonArray[j].cid === data.cid) {
                this.jsonArray[j].errorMsg = false;
                this.formError = false;
                // console.log(data.cid);
                // console.log(this.formError);
                break;
              }
            }
          }
      }
    }
  }

  saveFormReaponce() {
    for(let json of this.jsonArray) {
      this.checkError(json);
    }

    for(let json of this.jsonArray) {
      if(json.errorMsg){
        this.formError = true;
      }
    }

    if(!this.formError){
      console.log('ok');
    }

  }

  ngAfterViewInit() {
    componentHandler.upgradeDom();
  }

}
