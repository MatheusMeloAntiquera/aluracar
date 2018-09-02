import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {
  private _url: string = 'http://192.168.0.112:8080/api/';

  constructor(public http: HttpClient) {
  
  }

  get url() {
    return this._url;
  }
}
