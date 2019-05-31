import { DatePicker } from '@ionic-native/date-picker';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from './../../interfaces/agendamento';
import { HomePage } from './../home/home';
import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { Carro } from './../../interfaces/carro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro', 
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  public carro: Carro;
  public precoTotal: number;

  //Variaveis do formulario
  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();
  public _alerta: Alert;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoService: AgendamentosServiceProvider,
    private _alertCtrl: AlertController,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _vibration: Vibration,
    private _datePicker: DatePicker
  ) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');
  }

  selecionaData() {
    this._datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this._datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      data => this.data = data.toISOString()
    );
  }
  public agendar() {

    if (!this.nome || !this.endereco || !this.email) {
      this._vibration.vibrate(500);
      this._alertCtrl.create({
        title: "Preenchimento obrigatório",
        subTitle: "Preencha todos os campos",
        buttons: [
          { text: "Ok" }
        ]
      }).present();
      return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data
    }

    this._alerta = this._alertCtrl.create({
      title: "Aviso",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    let mensagem = "";

    this._agendamentoDao.agendamentoDuplicado(agendamento)
      .mergeMap(duplicado => {
        if (duplicado) {
          throw new Error('Agendamento já existente');
        }

        return this._agendamentoService.agenda(agendamento)
      })
      .mergeMap((valor) => {
        let observable = this._agendamentoDao.salva(agendamento);
        if (valor instanceof Error) {
          throw valor;

        }
        return observable;
      })
      .finally(
        () => {
          this._alerta.setSubTitle(mensagem).present();
        }
      )
      .subscribe(
        (data) => mensagem = "Agendamento realizado!",
        (error: Error) => mensagem = error.message,
      )

  }



}
