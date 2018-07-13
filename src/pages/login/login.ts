import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario-service';
import { Usuario } from "../../domain/usuario";
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styles: ['login.scss']
})
export class LoginPage {


  public login: string;
  public senha: string;
  public usuarios: Usuario[];
  public usuario: Usuario;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams, 
      private _usuarioService: UsuarioProvider,
      private _loadingCtrl: LoadingController,
      private _alertCtrl: AlertController
    ) {
  }

  public pesquisaUsuario() {

    let loader = this._loadingCtrl.create({
      content: 'Buscando usuário. Aguarde...'
    });
    loader.present();
    
    this._usuarioService.pesquisaUsuario(this.login, this.senha)
    .then((resultado) => {
      
      if(resultado.docs.length > 0) {
        loader.dismiss();
        this.usuarios = resultado.docs;
        this.usuario = this.usuarios[0];
        this.navCtrl.setRoot(HomePage, {usuario: this.usuario});
        
      } else {

        loader.dismiss();
        this._alertCtrl
          .create({
            title: 'Login não realizado!',
            buttons: [{ text: 'OK'}],
            subTitle: 'Login ou senha inválidos.'
          }).present();
      }
    }).catch((error) => {
        console.log(error);
        loader.dismiss();
        this._alertCtrl
          .create({
            title: 'Erro!',
            buttons: [{ text: 'OK!'}],
            subTitle: 'Não foi possível realizar o login.'
          }).present();
      }); 
  }

  
}
