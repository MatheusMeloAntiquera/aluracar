import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AgendamentosServiceProvider {

  private _urlApi = 'http://localhost:8080/api';
  constructor(private _http: HttpClient) {

  }

  agenda(agendamento) {
    return this._http.post(this._urlApi + "/agendamento/agenda", agendamento);
  }

}
