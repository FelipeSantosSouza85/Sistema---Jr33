import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AlunoPage } from '../pages/aluno/aluno';
import { Nav } from 'ionic-angular/components/nav/nav';
import { PesquisaAlunoPage } from '../pages/aluno/pesquisa-aluno';
import { PagamentoPage } from '../pages/pagamento/pagamento';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  public novoAluno = {titulo: 'Novo Aluno', componente: AlunoPage};
  public pesquisaAluno = {titulo: 'Pesquisar Aluno', componente: PesquisaAlunoPage};
  public incluirPagamento = {titulo: 'Realizar Pagamento', componente: PagamentoPage};


  @ViewChild(Nav) public nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrePagina(novoAluno) {

    switch (novoAluno) {
      case 'novoAluno':
        this.nav.push(this.novoAluno.componente);
        break;
      case 'pesquisaAluno':
        this.nav.push(this.pesquisaAluno.componente);
        break;
      case 'incluirPag':
      this.nav.push(this.incluirPagamento.componente);
      break;
        
      default:
        break;
    }
  }
}
