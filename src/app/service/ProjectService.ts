import { EventEmitter, Injectable, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ProjectService {

  constructor() {}

  emitFormElement = new EventEmitter<any>();
  emitFormCard = new EventEmitter<any>();

  demoform: any = [{"type":"text","required":false,"name":"Text"},{"type":"password","required":false,"hepltext":"","name":"password"},{"type":"email","required":false,"hepltext":"","name":"email"},{"type":"number","required":false,"hepltext":"","name":"number","rangeFrom":0,"rangeTo":100,"value":""},{"type":"phone","required":false,"hepltext":"","name":"Phone","rangeFrom":"","rangeTo":"","value":""},{"type":"textarea","required":false,"hepltext":"","name":"TextArea","rangeFrom":"","rangeTo":"","value":""},{"type":"date","required":false,"hepltext":"","name":"Date","rangeFrom":"2017-12-01","rangeTo":"2017-12-31","value":""},{"type":"time","required":false,"hepltext":"","name":"Time","rangeFrom":"00:00","rangeTo":"09:09","value":""},{"type":"radio","required":false,"hepltext":"","name":"radio","rangeFrom":"","rangeTo":"","value":"input2","option":["input1","input2"]},{"type":"checkbox","required":false,"hepltext":"","name":"Checkbox","rangeFrom":"","rangeTo":"","value":"","option":["1","2","3","4"],"values":["1","2"]},{"type":"dropdown","required":false,"hepltext":"","name":"Dropdown","rangeFrom":"","rangeTo":"","value":"2","option":["1","2","3","4"],"values":["1","2"]},{"type":"slider","required":false,"hepltext":"","name":"Slider","rangeFrom":0,"rangeTo":66,"value":33,"option":"","values":["1","2"]},{"type":"file","required":false,"hepltext":"","name":"File Input","rangeFrom":"","rangeTo":"","value":"","option":"","values":["1","2"],"fileTypes":[".png",".doc",".pdf"]},{"type":"location","required":false,"hepltext":"","name":"","rangeFrom":"","rangeTo":"","value":"","option":"","values":["1","2"],"fileTypes":""},{"type":"break","required":false,"hepltext":"","name":"Section Break","rangeFrom":"","rangeTo":"","value":"","option":"","values":["1","2"],"fileTypes":""}] ;

  formArray = [
    {
      Details: { name: 'Form0', rule: 'None', project: 'Project 0', status: 'Offline', cid: '1220' },
      Elements: [],
      Rules: [],
    },
    {
      Details: { name: 'Form1', rule: 'None', project: 'Project 1', status: 'Offline', cid: '1221' },
      Elements: [{ type: "text", required: false, name: "Name" },
      { type: "email", required: false, hepltext: "", name: "Email ID" },
      { type: "number", required: false, hepltext: "", name: "Number Input" },],
      Rules: [{ name: 'Rule 1', elementName: 'Name', elementType: "text", elementValue: "sam", template: 1, tempCid: '2332', tempName: 'template1' },],
    },
    {
      Details: { name: 'Form2', rule: 'None', project: 'Project 2', status: 'Online', cid: '2121' },
      Elements: [{type: "text", required: false, hepltext: "text helping text", name: "text"},
      {type: "password", required: false, hepltext: "help text for password", name: "Password"},
      {type: "email", required: false, hepltext: "", name: "email"},
      {type: "number", required: false, hepltext: "", name: "number", value: ""},
      {type: "phone", required: false, hepltext: "", name: "phone", rangeFrom: ""},
      {type: "textarea", required: false, hepltext: "", name: "textarea", rangeFrom: ""},
      {type: "date", required: false, hepltext: "", name: "date", rangeFrom: ""},
      {type: "time", required: false, hepltext: "", name: "time", rangeFrom: ""},
      {type: "radio", required: false, hepltext: "", name: "radio", rangeFrom: ""},
      {type: "checkbox", required: false, hepltext: "", name: "checkbox", rangeFrom: ""},
      {type: "dropdown", required: false, hepltext: "", name: "dropdown", rangeFrom: ""},
      {type: "slider", required: false, hepltext: "", name: "slider", rangeFrom: ""},
      {type: "file", required: false, hepltext: "", name: "File input", rangeFrom: ""},
      {type: "location", required: false, hepltext: "", name: "", rangeFrom: ""},
      {type: "break", required: false, hepltext: "", name: "section break", rangeFrom: ""},
    ],
      Rules: [],
    }
  ];

  formCard= [
    { name: 'Form0', project: 'Project 0', cid: '1220' },
    { name: 'Form1', project: 'Project 1', cid: '1221' },
    { name: 'Form2', project: 'Project 2', cid: '2121' },
    { name: 'IRTC Swatch Bharat survey form for all', project: 'Project 3', cid: '2121' },
  ];

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

}
