import { Agendamento } from './../../interfaces/agendamento';
import { HomePage } from './../home/home';
import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { Carro } from './../../interfaces/carro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

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
    private _alertCtrl: AlertController
  ) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');
    console.log(this.carro);
    console.log(this.precoTotal);
  }

  public agendar() {

    if (!this.nome || !this.endereco || !this.email) {
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
      precoTotal: this.precoTotal
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
    this._agendamentoService.agenda(agendamento)
      .subscribe(
        (data) => {
          mensagem = "Agendamento realizado!";
        },
        (error) => {
          mensagem = "Falha no agendamento! Tente novamente mais tarde";
        },
        () => {
          this._alerta.setSubTitle(mensagem).present();
        }
      )

  }
}
