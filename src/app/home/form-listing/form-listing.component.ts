import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-form-listing',
  templateUrl: './form-listing.component.html',
  styleUrls: ['./form-listing.component.css']
})
export class FormListingComponent implements OnInit {

  cardArray : any = [];

  constructor(private projectService: ProjectService, private router: Router) {
    this.projectService.emitFormCard.subscribe(res=>{
        this.cardArray = res;
    });
  }

  ngOnInit() {
    this.projectService.getFormCards();
  }

  form(cid) {
    setTimeout(()=>{
      this.router.navigate(['/form'], { queryParams: {id: cid}})
    }, 100);
  }

  ngAfterViewInit() {
    componentHandler.upgradeDom();
  }

}
