import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../interfaces/carro';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifeCycles } from '../../utils/ionic/nav/nav-lifecycles';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements NavLifeCycles {

  public carros: Carro[];
  public loading;

  constructor(
    public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertCrtl: AlertController,
    private _carrosService: CarrosServiceProvider
  ) { }

  ionViewDidLoad() {
    this.loading = this._loadingCtrl.create({
      content: "Aguarde o carregamento dos carros..."
    });

    this.loading.present();

    this._carrosService.lista().subscribe(
      (carros) => {
        this.carros = carros;
        this.loading.dismiss();
      },
      (error: HttpErrorResponse) => {
        console.log(`Codigo: ${error.status} - ${error.message}`);

        this.loading.dismiss();
        this._alertCrtl.create({
          title: "Falha na conexão",
          subTitle: "Não foi possível carregar a lista de carros. Tente novamente mais tarde!",
          buttons: [
            { text: "Ok" }
          ]
        }).present();

      },
    )
  }

  selecionaCarro(carro: Carro) {
    this.navCtrl.push(EscolhaPage.name, {carro: carro});
  }

}
