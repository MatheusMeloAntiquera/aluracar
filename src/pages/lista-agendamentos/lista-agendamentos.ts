import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from './../../interfaces/agendamento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ListaAgendamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  agendamentos: Agendamento[];
  private _alerta;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    public _agendamentoDao: AgendamentoDaoProvider,
    private _agendamentoService: AgendamentosServiceProvider) {
  }

  ionViewDidLoad() {
    this._agendamentoDao.listaAgendamentos()
      .subscribe(
        (agendamentos: Agendamento[]) => {
          this.agendamentos = agendamentos;
        }
      )
  }

  reenviar(agendamento: Agendamento) {

    this._alerta = this._alertCtrl.create({
      title: "Aviso",
      buttons: [
        {
          text: "Ok"
        }
      ]
    });

    let mensagem = "";


    return this._agendamentoService.agenda(agendamento)
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
        (data) => mensagem = "Agendamento reenviado com sucesso!",
        (error: Error) => mensagem = error.message,
      )
  }
}
