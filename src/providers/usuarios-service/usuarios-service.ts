import { Usuario } from './../../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuariosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosServiceProvider {
  private _usuarioLogado: Usuario;
  constructor(public http: HttpClient) {

  }

  efetuaLogin(email, senha) {
    return this.http.post<Usuario>('http://localhost:8080/api/login', { email, senha })
      .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }
}
