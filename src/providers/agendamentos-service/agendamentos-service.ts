import { Agendamento } from './../../interfaces/agendamento';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AgendamentosServiceProvider {

  private _urlApi = 'http://localhost:8080/api';
  constructor(private _http: HttpClient) {

  }

  agenda(agendamento: Agendamento) {
    return this._http.post(this._urlApi + "/agendamento/agenda", agendamento)
    .do(()=> {agendamento.enviado = true})
      .catch((error) => Observable.of(new Error("Falha no agendamento! Tente novamente mais tarde")));
  }

}
