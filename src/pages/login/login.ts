import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = 'joao@alura.com.br';
  senha: string = 'alura123';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _usuarioService: UsuariosServiceProvider,
    private _alertCtrl: AlertController
  ) {
  }

  efetuaLogin() {
    this._usuarioService
      .efetuaLogin(this.email, this.senha)
      .subscribe(
        () => {
          this.navCtrl.setRoot(HomePage);
        },
        () => {
          this._alertCtrl.create({
            title: 'Falha no Login',
            subTitle: 'Email ou senha incorretos! Verifique',
            buttons: [
              { text: 'Ok' }
            ]
          }).present();
        }
      );


  }
}
