import { CadastroPage } from './../cadastro/cadastro';
import { Acessorio } from './../../interfaces/acessorio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../interfaces/carro';

/**
 * Generated class for the EscolhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {
  public carro: Carro;
  public acessorios: Acessorio[];
  public _precoTotal: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = navParams.get('carro');
    this._precoTotal = this.carro.preco;
    this.acessorios = [
      { nome: 'Freio ABS', preco: 800 },
      { nome: 'Ar-condicionado', preco: 800 },
      { nome: 'MP3 Player', preco: 800 },
    ];
  }

  atualizaPrecoTotal(checado: boolean, acessorio: Acessorio) {
    this._precoTotal = checado
      ? this._precoTotal + acessorio.preco
      : this._precoTotal - acessorio.preco;
  }

  get precoTotal(){
    return this._precoTotal;
  }
  
  public avancarCadastro(){
    this.navCtrl.push(CadastroPage.name, {
      carroSelecionado: this.carro,
      precoTotal: this.precoTotal
    } );
  }
}
