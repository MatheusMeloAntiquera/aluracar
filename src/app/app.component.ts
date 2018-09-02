import { UsuariosServiceProvider } from './../providers/usuarios-service/usuarios-service';
import { PerfilPage } from './../pages/perfil/perfil';
import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { ListaAgendamentosPage } from './../pages/lista-agendamentos/lista-agendamentos';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html',
  selector: 'myapp'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage: any = LoginPage;

  public paginas = [
    { titulo: 'Agendamentos', pagina: ListaAgendamentosPage.name, icone: 'calendar' },
    { titulo: 'Perfil', pagina: PerfilPage.name, icone: 'person' }
  ];

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _usuarioService: UsuariosServiceProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public abrirPagina(pagina) {
    console.log(pagina);
    this.nav.push(pagina);
  }

  get usuarioLogado() {
    return this._usuarioService.obtemUsuarioLogado();
  }
}

