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
      for(let cr of this.jsonArray) {
        this.checkForRules(cr);
      }
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
    let flag  = 0;
    this.deleteRuleFromJsonArray(data.cid);
    if(this.completeArray.Rules) {
      if(this.completeArray.Rules.length > 0) {
        for(let r = 0; r< this.completeArray.Rules.length; r ++) {

          if(data.cid ==  this.completeArray.Rules[r].elementCid) {
            let tempDataArray = [];
            let tempElementValueArray = [];

            data.value+="";
            if((data.value).includes(",")) {
              tempDataArray = data.value.split(",");
            } else {
              if(data.value.length) {
                let d = (data.value).toString();
                if(d.includes(",")) {
                  tempDataArray = d.split(",");
                }
                else {
                  tempDataArray.push(d);
                }
              } else {
                tempDataArray.push(data.value);
              }
            }

            if((this.completeArray.Rules[r].elementValue).includes(",")) {
              tempElementValueArray = this.completeArray.Rules[r].elementValue.split(",");
            } else {
              // tempElementValueArray.push(temp.elementValue);
              if(this.completeArray.Rules[r].length) {
                let d = (this.completeArray.Rules[r].elementValue).toString();
                if(d.includes(",")) {
                  tempElementValueArray = d.split(",");
                }
                else {
                  tempElementValueArray.push(d);
                }
              } else {
                tempElementValueArray.push(this.completeArray.Rules[r].elementValue);
              }
            }

            if(this.completeArray.Rules[r].satisfyAll) {

              // ----> AND condition starts here <-----
              //
              tempDataArray = tempDataArray.sort();
              tempElementValueArray = tempElementValueArray.sort();
              console.log(tempDataArray);
              console.log(tempElementValueArray);
              if(tempDataArray.length==tempElementValueArray.length && tempDataArray.every((v,i)=> v === tempElementValueArray[i]))
              {
                console.log("match");
                let tempArray  = this.projectService.getTemplateElement(this.completeArray.Rules[r].tempCid);
                this.updateJsonArray(data.cid, tempArray);
              } else {
                this.deleteRuleFromJsonArray2(data);
              }
              //
              // ----> AND condition ends here <-----

            } else {

              // ----> or condition starts here <-----
              //
              for( let m of tempDataArray) {
                for(let n of tempElementValueArray) {

                  if(m === n) {
                    flag = 1;
                    let tempArray  = this.projectService.getTemplateElement(this.completeArray.Rules[r].tempCid);
                    this.updateJsonArray(data.cid, tempArray);
                  } else {
                    if(flag ==1) {
                      // break;
                    }
                  }
                }
              }
              if(flag == 1) {
                console.log(data.name+' matched!');
              } else {
                console.log(data.name+' not matched!');
                this.deleteRuleFromJsonArray2(data);
              }
              //
              // ----> or condition ends here <-----

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

    let temp = this.jsonArray;
    this.jsonArray = Array.from(new Set(this.jsonArray));

    componentHandler.upgradeDom();


  }

  deleteRuleFromJsonArray2(data) {



    // deleteElementFormJsonArray(data.cid) {
    //
    // }

    let tempArray: any = []
    let tempArray2: any = []

    for(let r = 0; r< this.completeArray.Rules.length; r ++) {

      if(data.cid == this.completeArray.Rules[r].elementCid) {
        tempArray = this.projectService.getTemplateElement(this.completeArray.Rules[r].tempCid);
        // console.log(tempArray);

        for(let r1 = 0; r1< this.jsonArray.length; r1 ++) {
          for(let r2 =0; r2< tempArray.length; r2++) {
            if(this.jsonArray[r1].cid == tempArray[r2].cid) {

              // console.log(this.jsonArray[r1].name);
              this.jsonArray.splice(r1,1);
            }
          }
        }
      }
    }

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
      componentHandler.upgradeDom();
    }

    this.jsonArray = temp1;
    this.jsonArray = this.jsonArray.concat(temp2);
    // console.log(this.jsonArray);
    componentHandler.upgradeDom();

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
