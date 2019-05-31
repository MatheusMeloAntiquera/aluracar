import { ApiServiceProvider } from './../api-service/api-service';
import { Usuario } from './../../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuariosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const CHAVE = 'avatar-usuario';

@Injectable()
export class UsuariosServiceProvider {
  private _usuarioLogado: Usuario;
  _url: string;

  constructor(
    public http: HttpClient,
    private _api: ApiServiceProvider) {
    this._url = this._api.url;
  }

  efetuaLogin(email, senha) {
    return this.http.post<Usuario>(this._url + 'login', { email, senha })
      .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  } 

  salvaAvatar(avatar) {
    localStorage.setItem(CHAVE, avatar);
  }

  obtemAvatar() {
    return localStorage.getItem(CHAVE) 
      ? localStorage.getItem(CHAVE)
      : 'assets/img/avatar-padrao.jpg' ;
  }
}
