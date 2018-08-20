import { EscolhaPageModule } from './../escolha/escolha.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';


@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        EscolhaPageModule
    ],
    entryComponents: [
        HomePage
    ],
    exports: [
        HomePage
    ]
})
export class HomePageModule { }
