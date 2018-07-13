import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario-service';
import { LoginPage } from "../pages/login/login";
import { AlunoPage } from "../pages/aluno/aluno";
import { AlunoProvider } from '../providers/aluno/aluno-service';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { PesquisaAlunoPage } from "../pages/aluno/pesquisa-aluno";
import { ModalPage } from '../pages/modal/modal';
import { PagamentoPage } from '../pages/pagamento/pagamento';
import { PagamentoProvider } from '../providers/pagamentos/pagamento-service';
import { ProdutoProvider } from '../providers/produto/produto-service';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { Mask } from "../domain/utils/mascara";
import { DatePicker } from "@ionic-native/date-picker";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AlunoPage,
    PesquisaAlunoPage,
    ModalPage,
    PagamentoPage,
    Mask
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AlunoPage,
    PesquisaAlunoPage,
    ModalPage,
    PagamentoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    AlunoProvider,
    PagamentoProvider,
    ProdutoProvider,
    DatePicker
  ]
})
export class AppModule {}
