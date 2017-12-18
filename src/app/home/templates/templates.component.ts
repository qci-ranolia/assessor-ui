import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../../service/ProjectService';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  fcid : any;
  templateCid: any;

  constructor(private projectService: ProjectService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.projectService.emitFormElement.subscribe((res)=>{
      // console.log(res);
    });

  }

  ngOnInit() {
    let sub = this.activatedRoute.queryParams.subscribe(params=>{
        this.fcid = params.id;
        this.templateCid = params.templateCid;

        if(this.fcid != undefined) {
          this.projectService.getFormByCid(this.fcid);
        }
        if(this.templateCid != undefined) {
          this.projectService.getTemplateByCid(this.templateCid);
        }
    });
  }

  ngAfterViewInit() {
    componentHandler.upgradeDom();
  }

}
