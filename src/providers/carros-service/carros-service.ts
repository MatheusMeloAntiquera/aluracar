import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carro } from '../../interfaces/carro';
import { ApiServiceProvider } from '../api-service/api-service';

/*
  Generated class for the CarrosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarrosServiceProvider {
  _url: string;
  constructor(
    public _http: HttpClient,
    private _api: ApiServiceProvider
  ) {
    this._url = this._api.url;
  }

  lista() {
    return this._http.get<Carro[]>(this._url + 'carro/listaTodos');
  }

}
