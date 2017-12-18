import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProjectService } from '../../../service/ProjectService';
import './allscript.js';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  completeArray : any = [];
  jsonArray: any = [];
  formDetails: any = [];
  rules: any = [];
  act_data: any = [];
  flag: any;
  pos: any;
  display = false;
  formError = false;
  rule = false;
  submitButton = 'Submit';
  templateCid: any;
  disableSubmitButton : any = true;

  constructor(private projectService: ProjectService, private router: Router) {
    this.projectService.emitFormElement.subscribe((res)=>{
      this.disableSubmitButton = false;
      this.rule = false;
      // console.log(res);
      this.completeArray = res;
      this.jsonArray = res.Elements;
      this.formDetails = res.Details;
      this.rules = res.Rules;
      this.display = true;
    });
    if(!this.rule) {
        this.submitButton = "Submit";
    }
  }


  ngOnInit() {

  }

  responseData(data: any) {
    // console.log(data);
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
        this.checkForRules(data);
    }
    if(this.flag == 0) {
      this.act_data.push(data);
      this.checkError(data);
      this.checkForRules(data);
    }

  }

  checkForRules(data) {
    if(this.completeArray.Rules) {

      if(this.completeArray.Rules.length > 0) {

        for(let temp of this.completeArray.Rules) {

          if(data.cid === temp.elementCid) {

          if( data.value === temp.elementValue ) {
            this.rule = true;
            let tempArray : any;
            this.templateCid = temp.tempCid;
            // this.tempArray  = this.projectService.getTemplateElement(temp.tempCid);
            // this.jsonArray = this.jsonArray.concat(tempArray);
            // console.log(this.jsonArray);
            // componentHandler.upgradeDom();

              if(this.rule) {
                  this.submitButton = "Next Form";
              }
            } else {
                this.rule = false;
                this.submitButton = "Submit";
            }
          }
        }
      }
    }
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

    if(this.rule) {
      this.projectService.storeFormArray(this.completeArray);
      this.router.navigate(['/template'], { queryParams: { templateCid:  this.templateCid} });
    }

    if(!this.formError){
      // console.log('ok');
      componentHandler.upgradeDom();
      this.disableSubmitButton = true;
      
    }

    if(!this.rule) {
      this.submitResponce();
    }
  }

  submitResponce() {
    componentHandler.upgradeDom();
    this.submitButton = "Just a moment";
    setTimeout(()=>{
      this.jsonArray = [];
      this.disableSubmitButton = false;
    }, 1000);
    this.projectService.submitFormArray(this.completeArray);
  }

  ngAfterViewInit() {
    componentHandler.upgradeDom();
  }

  backToDashboard() {
    setTimeout(()=>{
      this.router.navigate(['/']);
    }, 300);
  }

}
