import { Agendamento } from './../../interfaces/agendamento';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AgendamentoDaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendamentoDaoProvider {

  constructor(
    private _storage: Storage
  ) {

  }

  geraChave(agendamento: Agendamento) {
    return agendamento.emailCliente + agendamento.data.substr(0, 10)
  }

  salva(agendamento: Agendamento) {
    let chave = this.geraChave(agendamento);
    let promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

  agendamentoDuplicado(agendamento: Agendamento) {
    let chave = this.geraChave(agendamento);
    let promise = this._storage.get(chave)
      .then(dado => { return dado ? true : false});

    return Observable.fromPromise(promise);
  }
}
