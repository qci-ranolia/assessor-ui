import { EventEmitter, Injectable, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ProjectService {

  constructor() {}

  emitFormElement = new EventEmitter<any>();
  emitFormCard = new EventEmitter<any>();

  demoform: any = [
    {"type":"text","required":true,"name":"Text0", "helptext":"Some help text goes here","cid":"1","value":""},
    {"type":"text","required":true,"name":"Text","cid":"2", "helptext":"Some help text goes here","value":""},
    {"type":"password","required":true, "helptext":"Some help text goes here","name":"password","cid":"3","value":""},
    {"type":"email","required":true, "helptext":"Some help text goes here","name":"email","cid":"4","value":""},
    {"type":"number","required":true, "helptext":"Some help text goes here","name":"number","rangeFrom":0,"rangeTo":100,"value":"","cid":"5"},
    {"type":"phone","required":true, "helptext":"Some help text goes here","name":"Phone","rangeFrom":"","rangeTo":"","value":"","cid":"6"},
    {"type":"textarea","required":true, "helptext":"Some help text goes here","name":"TextArea","rangeFrom":"","rangeTo":"","value":"","cid":"7"},
    {"type":"date","required":true, "helptext":"Some help text goes here","name":"Date","rangeFrom":"2017-12-01","rangeTo":"2017-12-31","value":"","cid":"8"},
    {"type":"time","required":true, "helptext":"Some help text goes here","name":"Time","rangeFrom":"00:00","rangeTo":"09:09","value":"","cid":"9"},
    {"type":"radio","required":true, "helptext":"Some help text goes here","name":"radio","rangeFrom":"","rangeTo":"","value":"input2","option":["input1","input2"],"cid":"10"},
    {"type":"checkbox","required":true, "helptext":"Some help text goes here","name":"Checkbox","rangeFrom":"","rangeTo":"","value":"","option":["1","2","3","4"],"values":["1","2"],"cid":"11"},
    {"type":"dropdown","required":true, "helptext":"Some help text goes here","name":"Dropdown","rangeFrom":"","rangeTo":"","value":"2","option":["1","2","3","4"],"values":["1","2"],"cid":"12"},
    {"type":"slider","required":true, "helptext":"Some help text goes here","name":"Slider","rangeFrom":0,"rangeTo":66,"value":33,"option":"","values":["1","2"],"cid":"13"},
    {"type":"file","required":true, "helptext":"Some help text goes here","name":"File Input","rangeFrom":"","rangeTo":"","value":"","option":"","values":["1","2"],"fileTypes":[".png",".doc",".pdf"],"cid":"14"},
    {"type":"location","required":true, "helptext":"Some help text goes here","name":"","cid":"15"},
    {"type":"break","required":true, "helptext":"Some help text goes here","name":"Section Break","cid":"16"}
  ] ;

  formArray = [
    {
      Details: { name: 'Form0', rule: 'None', project: 'Project 0', status: 'Offline', cid: '1220' },
      Elements: [],
      Rules: [
        {name: 'Rule 1',elementCid:'2', elementName:'Text', elementType: "text", elementValue:"sam", tempCid: '12332', tempName: 'template1'},
        {name: 'Rule 2',elementCid:'1', elementName:'Text0', elementType: "text", elementValue:"sammy", tempCid: '12323', tempName: 'template2'},
      ],
    },
    {
      Details: { name: 'Form1', rule: 'None', project: 'Project 1', status: 'Offline', cid: '1221' },
      Elements: [{ type: "text", required: false, name: "Name" ,"cid":"1"},
      { type: "email", required: false, hepltext: "", name: "Email ID" ,"cid":"2"},
      { type: "number", required: false, hepltext: "", name: "Number Input" ,"cid":"3"},],
      Rules: [
        {name: 'Rule 1',elementCid:'2', elementName:'Text', elementType: "text", elementValue:"sam", tempCid: '12332', tempName: 'template1'}
      ],
    },
    {
      Details: { name: 'Form2', rule: 'None', project: 'Project 2', status: 'Online', cid: '2121' },
      Elements: [{type: "text", required: false, hepltext: "text helping text", name: "text","cid":"1"},
      {type: "password", required: false, hepltext: "help text for password", name: "Password","cid":"2"},
      {type: "email", required: false, hepltext: "", name: "email","cid":"3"},
      {type: "number", required: false, hepltext: "", name: "number", value: "","cid":"5"},
      {type: "phone", required: false, hepltext: "", name: "phone", rangeFrom: "","cid":"6"},
      {type: "textarea", required: false, hepltext: "", name: "textarea", rangeFrom: "","cid":"7"},
      {type: "date", required: false, hepltext: "", name: "date", rangeFrom: "","cid":"8"},
      {type: "time", required: false, hepltext: "", name: "time", rangeFrom: "","cid":"9"},
      {type: "file", required: false, hepltext: "", name: "File input", rangeFrom: "","cid":"10"},
      {type: "location", required: false, hepltext: "", name: "", rangeFrom: "","cid":"11"},
      {type: "break", required: false, hepltext: "", name: "section break", rangeFrom: "","cid":"12"},
    ],
      Rules: [],
    }
  ];

  formCard= [
    { name: 'Form0', project: 'Project 0', cid: '1220' },
    { name: 'Form1', project: 'Project 1', cid: '1221' },
    { name: 'Form2', project: 'Project 2', cid: '2121' },
    { name: 'IRCTC Swatch Railway Survey for General Public', project: 'Project 3', cid: '2121' },
  ];

  templateArray = [
                { Details:   { name: 'template1', project:"N/A", cid:'12332'},
                  Elements:  [{type: "text", required: true, name: "Name", cid:"1121", value:'', helptext: "some text here 01",},
                                  {type: "email", required: false, name: "Email ID", cid:"2122", value:''},
                                  {type: "number", required: false,  name: "Number Input", cid:"3123", value:''},],

                },
                { Details:   { name: 'template2', rule: 'None', project:"N/A", cid:'12323' },
                  Elements:  [{type: "text", required: false, name: "Name2", cid:"11121", value:''},
                                {type: "email", required: true, helptext: "some text 1", name: "Email ID2", cid:"12122", value:''},
                                {type: "number", required: true, helptext: "some text 2", name: "Number Input2", cid:"13123", value:''},],
                }
              ];

  storeFormArrayTemp :any = [];
  submittedForm: any[];

  getFormCards() {
    this.emitFormCard.emit(this.formCard);
  }

  getFormByCid(cid) {
      // not impressive code

        let temp = JSON.stringify(this.demoform);
        temp = JSON.parse(temp);
        this.formArray[0].Elements = this.demoform;

      //  till here

    for(let i of this.formArray) {
      if(i.Details.cid == cid) {
        this.emitFormElement.emit(i);
        break;
      }
    }
  }

  getTemplateElement(tempCid : any) {
    for(let temp of this.templateArray) {
      if( temp.Details.cid == tempCid ) {
        return temp.Elements;
      }
    }
  }

  getTemplateByCid(tempCid: any) {
    for(let i of this.templateArray) {
      if(i.Details.cid == tempCid) {
        this.emitFormElement.emit(i);
        break;
      }
    }
  }

  storeFormArray(formArray: any) {
    this.storeFormArrayTemp = formArray;
  }

  submitFormArray(tempArray: any) {
    if(this.storeFormArrayTemp.Elements) {

      for(let temp of this.storeFormArrayTemp.Rules) {

        if(temp.tempCid == tempArray.Details.cid) {

          this.storeFormArrayTemp.Elements = this.storeFormArrayTemp.Elements.concat(tempArray.Elements);
          this.submittedForm = this.storeFormArrayTemp;
          console.log(this.submittedForm);
          this.storeFormArrayTemp = [];


        }
      }
    } else {
      this.submittedForm = tempArray;
      console.log(this.submittedForm)
    }

  }
}
