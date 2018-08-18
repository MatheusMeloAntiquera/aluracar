import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscolhaPage } from './escolha';

@NgModule({
  declarations: [
    EscolhaPage,
  ],
  imports: [
    IonicPageModule.forChild(EscolhaPage),
  ],
  entryComponents: [
    EscolhaPage
  ],
  exports: [
    EscolhaPage
  ]
})
export class EscolhaPageModule {}
