import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Aluno } from '../../domain/aluno';
import { AlunoProvider } from '../../providers/aluno/aluno-service';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DatePicker } from '../../../node_modules/@ionic-native/date-picker';

@Component({
  selector: 'page-aluno',
  templateUrl: 'aluno.html',
})
export class AlunoPage {

  public aluno: Aluno;
  public planoFamilia: boolean;
  public mensagemNome = '';
  public mensagemCpf = '';
  public exibeMsgNome: boolean;
  public exibeMsgCpf: boolean;
  DECIMAL_SEPARATOR = ".";
  GROUP_SEPARATOR = ",";
  pureResult: any;
  maskedId: any;
  val: any;
  v: any;
  public mask = '';
  public phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alunoService: AlunoProvider,
    public modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _datePicker: DatePicker
  ) {
    this.aluno = new Aluno();

  }


  exibe(ligado: boolean) {

    if (ligado) {
      this.aluno.tipoMatricula = 'F';
      this.planoFamilia = true;
    } else {
      this.planoFamilia = false
    }
  }

  salvarAluno() {

    if (this.validaDadosAluno(this.aluno)) {

      this._alunoService.pesquisaAlunoCpf(this.aluno.cpf)
        .then((resultado) => {

          if (resultado.docs.length > 0) {

            let alunoCadastrado = resultado.docs[0];

            this._alertCtrl
              .create({
                title: 'O aluno ' + alunoCadastrado.nome + ' já esta cadastrado.',
                buttons: [{ text: 'OK' }],
              }).present();

            return;
          } else {
            this._alunoService.createAluno(this.aluno);
            this._alertCtrl
              .create({
                title: 'Aluno Salvo com sucesso!',
                buttons: [{ text: 'OK!' }],
                cssClass: 'alertCustomCss'
              }).present();

            this.aluno = new Aluno;
          }
        });
    }
  }

  validaDadosAluno(aluno: Aluno) {
    this.exibeMsgNome = false;
    this.exibeMsgCpf = false;
    this.mensagemNome = '';
    this.mensagemCpf = '';
    if (aluno.nome == null || aluno.nome.length < 3) {
      this.exibeMsgNome = true;
      this.mensagemNome = 'Campo obrigatório, mínimo de 3 caracteres.'
      return false;
    }

    if (aluno.cpf == null || aluno.cpf.length < 11) {
      this.exibeMsgCpf = true;
      this.mensagemCpf = 'Campo obrigatório, com 11 caracteres.'
      return false;
    }

    return true;
  }

  buscaEndereco(event) {
    this._alunoService.buscaCep(this.aluno.cep)
      .then(dado => {
        this.aluno.logradouro = dado.logradouro;
        this.aluno.bairro = dado.bairro;
        this.aluno.cidade = dado.cidade;
        this.aluno.estado = dado.estado;
      })
      .catch(() => {
        this._alertCtrl.create({
          title: 'Problema no Login',
          subTitle: 'Email ou senha inválidos, verifique',
          buttons: [{ text: 'Ok' }]
        }).present();
      });

  }

  formatCpf(valString) {
    if (!valString) {
      return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;
    if (parts[0].length <= 11) {
      this.aluno.cpf = this.cpf_mask(parts[0]);
      return this.aluno.cpf;
    }
  };

  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  };

  cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Remove all that is not digits
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit again
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Insert an dash between the third and quarter digit
    return v;
  }

  selecionaData() {

    this._datePicker.show({
      date: new Date(),
      mode: 'date'
    })
      .then(data => this.aluno.dataNascimento = data.toISOString());
  }

}
