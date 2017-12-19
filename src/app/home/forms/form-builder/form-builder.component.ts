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
      console.log(res);
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

  ngOnInit() {}

  responseData(data: any) {
    // console.log(data);
    componentHandler.upgradeDom();

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

          if( data.value.trim() === temp.elementValue.trim() ) {
            // console.log(data);
            this.rule = true;
            let tempArray : any;
            this.templateCid = temp.tempCid;                                                                  // --------- > 1st Rule process
            tempArray  = this.projectService.getTemplateElement(temp.tempCid);                                // --------- > 1st Rule process
            this.updateJsonArray(data.cid, tempArray);                                                        // --------- > 1st Rule process

              // if(this.rule) {                                                                              // ---------- > 2nd Rule process
              //     this.submitButton = "Next Form";                                                         // ---------- > 2nd Rule process
              // }                                                                                            // ---------- > 2nd Rule process
            } else {
                this.rule = false;
                this.submitButton = "Submit";
                this.deleteRuleFromJsonArray(data.cid);                                                        // --------- > 1st Rule process
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

  updateJsonArray(cid, tempArray) {
    // console.log(tempArray);
    let index: any;
    let temp1 : any=[];
    let temp2 : any=[];
    for( let i=0; i<this.jsonArray.length; i++) {
      if(this.jsonArray[i].cid == cid) {
        index = i;
        // console.log(index);
      }
    }
    for(let i=0; i<=index; i++) {
      temp1.push(this.jsonArray[i]);
      // console.log(this.jsonArray[i]);
    }
    for(let i=(index+1); i<this.jsonArray.length; i++) {
      temp2.push(this.jsonArray[i]);
      // console.log(this.jsonArray[i]);
    }
    this.jsonArray = temp1;
    this.jsonArray = this.jsonArray.concat(tempArray);
    this.jsonArray = this.jsonArray.concat(temp2);
    // console.log(this.jsonArray);
    componentHandler.upgradeDom();

  }

  deleteRuleFromJsonArray(cid) {
    let index : any;
    let temp1 : any=[];
    let temp2 : any=[];
    for( let i=0; i<this.jsonArray.length; i++) {
      if(this.jsonArray[i].cid == cid) {
        index = i;
        // console.log(index);
      }
    }
    for(let i=0; i<=index; i++) {
      temp1.push(this.jsonArray[i]);
      // console.log(this.jsonArray[i]);
    }
    for(let i=(index+1); i<this.completeArray.Elements.length; i++) {
      temp2.push(this.completeArray.Elements[i]);
      // console.log(this.completeArray.Elements[i]);
    }

    this.jsonArray = temp1;
    this.jsonArray = this.jsonArray.concat(temp2);
    // console.log(this.jsonArray);

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
      componentHandler.upgradeDom();
      this.disableSubmitButton = true;
      setTimeout(()=>{
        this.submitResponce();
      }, 10);
    }

    //  if(this.rule) {
    //   this.projectService.storeFormArray(this.completeArray);                                          // ---------- > 2nd Rule process
    //   this.router.navigate(['/template'], { queryParams: { templateCid:  this.templateCid} });         // ---------- > 2nd Rule process
    // }                                                                                                  // ---------- > 2nd Rule process
    // if(!this.rule) {                                                                                   // ---------- > 2nd Rule Process
    //   this.submitResponce();                                                                           // ---------- > 2nd Rule Process
    // }                                                                                                  // ---------- > 2nd Rule Process

  }

  submitResponce() {
    componentHandler.upgradeDom();
    this.submitButton = "Just a moment";
    setTimeout(()=>{
      this.jsonArray = [];
      this.disableSubmitButton = false;
    }, 2500);
    this.completeArray.Elements = this.jsonArray;
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
