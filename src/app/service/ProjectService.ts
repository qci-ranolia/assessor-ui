import { EventEmitter, Injectable, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ProjectService {

  constructor() {}

  emitFormElement = new EventEmitter<any>();

}
