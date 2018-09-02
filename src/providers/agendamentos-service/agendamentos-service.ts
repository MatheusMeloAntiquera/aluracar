import { Agendamento } from './../../interfaces/agendamento';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceProvider } from '../api-service/api-service';


@Injectable()
export class AgendamentosServiceProvider {

  private _url;
  constructor(
    private _http: HttpClient,
    private _api: ApiServiceProvider) {
    this._url = this._api.url;
  }

  agenda(agendamento: Agendamento) {
    return this._http.post(this._url + "agendamento/agenda", agendamento)
      .do(() => { agendamento.enviado = true })
      .catch((error) => Observable.of(new Error("Falha no agendamento! Tente novamente mais tarde")));
  }

}
