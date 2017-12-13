import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  fcid : any;

  constructor(private projectService: ProjectService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.projectService.emitFormElement.subscribe((res)=>{
      // console.log(res);
    });

  }

  ngOnInit() {
    let sub = this.activatedRoute.queryParams.subscribe(params=>{
        this.fcid = params.id;
        // console.log(this.fcid);
        this.projectService.getFormByCid(this.fcid);
    });
  }



}
