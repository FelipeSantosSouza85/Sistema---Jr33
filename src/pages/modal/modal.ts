import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Aluno } from '../../domain/aluno';



@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

public listaAlunos: Aluno[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
  }

  ionViewDidLoad() {
    
    this.listaAlunos = this.navParams.get('alunos');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
    
}

  selecionaAluno(aluno) {
    
    this.viewCtrl.dismiss(aluno);
  }

}
