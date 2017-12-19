import { Http, Response, Headers, RequestOptions,BaseRequestOptions, RequestMethod} from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class APIService {

  projectURL: string = 'http://192.168.15.221:8000';
  // projectURL: string = 'http://qcitech.org:8081';

  constructor( private http: Http, ) {}

  SyncAll() {
    return this.http.get(this.projectURL+'/gettestforms').map(res=>res.json());

  }
}
