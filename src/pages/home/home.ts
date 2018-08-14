import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public carros;
  constructor(public navCtrl: NavController) {
    this.carros = [
      { nome: "Azera V6", preco: 85000 },
      { nome: "Onix 1.6", preco: 35000 },
      { nome: "Fiest 2.0", preco: 52000 },
    ];
  }

}
