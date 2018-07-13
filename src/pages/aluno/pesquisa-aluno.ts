import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AlunoProvider } from '../../providers/aluno/aluno-service';
import { ModalController } from 'ionic-angular';
import { Aluno } from '../../domain/aluno';
import { ModalPage } from '../modal/modal';
import { PagamentoPage } from '../pagamento/pagamento';
import { Pagamento } from '../../domain/pagamento';
import { PagamentoProvider } from '../../providers/pagamentos/pagamento-service';


@Component({
  selector: 'page-pesquisa-aluno',
  templateUrl: 'pesquisa-aluno.html',
})
export class PesquisaAlunoPage {

public nome: string;
public cpf: string;
public alunos: Aluno[];
public alunoSelecionado: Aluno;
public cpfAluno: string;
public temAluno: boolean;
public pagamentos: Pagamento[] = new Array(12);
public pagouJaneiro: string;
public pagouFevereiro: string;
public pagouMarco: string;
public pagouAbril: string;
public pagouMaio: string;
public pagouJunho: string;
public pagouJulho: string;
public pagouAgosto: string;
public pagouSetembro: string;
public pagouOutubro: string;
public pagouNovembro: string;
public pagouDezembro: string;
public mes: number;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alunoService: AlunoProvider,
    private _alertCtrl: AlertController,
    private _modalCtrl: ModalController,
    private _pagamentoService: PagamentoProvider,
  ) { 

    console.log(this.navParams.get('nomeAluno'));
    console.log(this.navParams.get('cpfAluno'));
    this.alunoSelecionado = new Aluno;
    this.mes = new Date().getMonth() + 1;

  }

  public pesquisaAluno() {

    if(this.nome && this.cpf) {

      this._alunoService.pesquisaAlunoCompleto(this.nome, this.cpf)
      .then((resultado) => {
      
        this.alunos = resultado.docs;
        this.alunoSelecionado = this.alunos[0];
        this.pesquisaPagamentos(this.alunoSelecionado);
        
        this.temAluno = true;
          
      }).catch((error) => {
          console.log(error);
          this._alertCtrl
            .create({
              title: 'Erro!',
              buttons: [{ text: 'OK!'}],
              subTitle: 'Não foi recuperar os dados do aluno.'
            }).present();
        }); 

    } else if(this.nome) {
      this._alunoService.pesquisaAlunoNome(this.nome)
      .then((resultado) => {
      
        this.alunos = resultado.docs;
  
        if(this.alunos.length > 0) {
          if(this.alunos.length == 1) {
            this.alunoSelecionado = this.alunos[0];
            this.pesquisaPagamentos(this.alunoSelecionado);
            this.temAluno = true;

          } else {
            var dados = { alunos : this.alunos };
            let modal = this._modalCtrl.create(ModalPage, dados);
            modal.onDidDismiss(data => {
             
              let alunoStr = JSON.stringify(data);
              var obj = JSON.parse(alunoStr);
              this.alunoSelecionado = obj;
              this.pesquisaPagamentos(this.alunoSelecionado);
              this.temAluno = true;
              
            });
            modal.present();
          }
          
        } 
      }).catch((error) => {
          console.log(error);
          this._alertCtrl
            .create({
              title: 'Erro!',
              buttons: [{ text: 'OK!'}],
              subTitle: 'Não foi recuperar os dados do aluno.'
            }).present();
        }); 
    } else if(this.cpf) {
      this._alunoService.pesquisaAlunoCpf(this.cpf)
      .then((resultado) => {
      
        this.alunos = resultado.docs;
        this.alunoSelecionado = this.alunos[0];
        this.pesquisaPagamentos(this.alunoSelecionado);
        
      }).catch((error) => {
          console.log(error);
          this._alertCtrl
            .create({
              title: 'Erro!',
              buttons: [{ text: 'OK!'}],
              subTitle: 'Não foi possível recuperar os dados do aluno.'
            }).present();
        }); 
    }
  }

  public realizarPagamento() {

    let pagamento = new Pagamento();
    pagamento.cpfAluno = this.alunoSelecionado.cpf;
    pagamento.nomeAluno = this.alunoSelecionado.nome;

    this.navCtrl.push(PagamentoPage, {pagamento: pagamento});
  }

  public pesquisaPagamentos(aluno: Aluno) {
    this._pagamentoService.pesquisaPagamentosAluno(this.alunoSelecionado.cpf)
      .then((resultado) => {

      this.pagouJaneiro = 'v';
      this.pagouFevereiro = 'v';
      this.pagouMarco = 'v';
      this.pagouAbril = 'v';
      this.pagouMaio = 'v';
      this.pagouJunho = 'v';
      this.pagouJulho = 'v';
      this.pagouAgosto = 'v';
      this.pagouSetembro = 'v';
      this.pagouOutubro = 'v';
      this.pagouNovembro = 'v';
      this.pagouDezembro = 'v';

      this.validaMes(this.mes);
      this.validaDataCadastro(this.alunoSelecionado);

        let pagamentos = resultado.docs;

        if(pagamentos.length > 0) {
          for (let pag of pagamentos) {
            if(pag.tipoPagamento == "1" || pag.tipoPagamento == "2") {

              let index = pag.mesPagamento

              switch (index) {
                case "1":
                  this.pagouJaneiro = 'p';
                  break;
                  case "2":
                  this.pagouFevereiro  = 'p';
                  break;
                  case "3":
                  this.pagouMarco  = 'p';
                  break;
                  case "4":
                  this.pagouAbril  = 'p';
                  break;
                  case "5":
                  this.pagouMaio  = 'p';
                  break;
                  case "6":
                  this.pagouJunho  = 'p';
                  break;
                  case "7":
                  this.pagouJulho  = 'p';
                  break;
                  case "8":
                  this.pagouAgosto  = 'p';
                  break;
                  case "9":
                  this.pagouSetembro  = 'p';
                  break;
                  case "10":
                  this.pagouOutubro  = 'p';
                  break;
                  case "11":
                  this.pagouNovembro  = 'p';
                  break;
                  case "12":
                  this.pagouDezembro  = 'p';
                  break;
                default:
                  break;
              }
            }
          }
        } 
        this.validaDiaVencimento(this.alunoSelecionado);
        this.alunoSelecionado.pagamentos = pagamentos;
      }).catch((error) => {
          console.log(error);
      }); 
  }

  validaMes(mes: number) {

    switch (mes) {
      case 1:
      this.pagouFevereiro = 'n';
      this.pagouMarco = 'n';
      this.pagouAbril = 'n';
      this.pagouMaio = 'n';
      this.pagouJunho = 'n';
      this.pagouJulho = 'n';
      this.pagouAgosto = 'n';
      this.pagouSetembro = 'n';
      this.pagouOutubro = 'n';
      this.pagouNovembro = 'n';
      this.pagouDezembro = 'n';
        break;
        case 2:
      this.pagouMarco = 'n';
      this.pagouAbril = 'n';
      this.pagouMaio = 'n';
      this.pagouJunho = 'n';
      this.pagouJulho = 'n';
      this.pagouAgosto = 'n';
      this.pagouSetembro = 'n';
      this.pagouOutubro = 'n';
      this.pagouNovembro = 'n';
      this.pagouDezembro = 'n';
        break;
        case 3:
      this.pagouAbril = 'n';
      this.pagouMaio = 'n';
      this.pagouJunho = 'n';
      this.pagouJulho = 'n';
      this.pagouAgosto = 'n';
      this.pagouSetembro = 'n';
      this.pagouOutubro = 'n';
      this.pagouNovembro = 'n';
      this.pagouDezembro = 'n';
        break;
        case 4:
      this.pagouMaio = 'n';
      this.pagouJunho = 'n';
      this.pagouJulho = 'n';
      this.pagouAgosto = 'n';
      this.pagouSetembro = 'n';
      this.pagouOutubro = 'n';
      this.pagouNovembro = 'n';
      this.pagouDezembro = 'n';
        break;
        case 5:
      this.pagouJunho = 'n';
      this.pagouJulho = 'n';
      this.pagouAgosto = 'n';
      this.pagouSetembro = 'n';
      this.pagouOutubro = 'n';
      this.pagouNovembro = 'n';
      this.pagouDezembro = 'n';
        break;
        case 6:
      this.pagouJulho = 'n';
      this.pagouAgosto = 'n';
      this.pagouSetembro = 'n';
      this.pagouOutubro = 'n';
      this.pagouNovembro = 'n';
      this.pagouDezembro = 'n';
        break;
        case 7:
      this.pagouAgosto = 'n';
      this.pagouSetembro = 'n';
      this.pagouOutubro = 'n';
      this.pagouNovembro = 'n';
      this.pagouDezembro = 'n';
        break;
        case 8:
      this.pagouSetembro = 'n';
      this.pagouOutubro = 'n';
      this.pagouNovembro = 'n';
      this.pagouDezembro = 'n';
        break;
        case 9:
      this.pagouOutubro = 'n';
      this.pagouNovembro = 'n';
      this.pagouDezembro = 'n';
        break;
        case 10:
      this.pagouNovembro = 'n';
      this.pagouDezembro = 'n';
        break;
        case 11:
      this.pagouDezembro = 'n';
        break;
      default:
        break;
    }
  }

  validaDataCadastro(aluno: Aluno) {

    let anoCorrente = new Date().getFullYear();
    let data = new Date(aluno.dataCadastro);
    let mesCadastro = data.getMonth() +1;
    let anoCadastro = data.getFullYear();

      if(anoCorrente == anoCadastro) {
        switch (mesCadastro) {
          case 2:
            this.pagouJaneiro = 's';
          break;
          case 3:
            this.pagouJaneiro = 's';
            this.pagouFevereiro = 's';
          break;
          case 4:
            this.pagouJaneiro = 's';
            this.pagouFevereiro = 's';
            this.pagouMarco = 's';
          break;
          case 5:
            this.pagouJaneiro = 's';
            this.pagouFevereiro = 's';
            this.pagouMarco = 's';
            this.pagouAbril = 's';
          break;
          case 6:
            this.pagouJaneiro = 's';
            this.pagouFevereiro = 's';
            this.pagouMarco = 's';
            this.pagouAbril = 's';
            this.pagouMaio = 's';
          break;
          case 7:
            this.pagouJaneiro = 's';
            this.pagouFevereiro = 's';
            this.pagouMarco = 's';
            this.pagouAbril = 's';
            this.pagouMaio = 's';
            this.pagouJunho = 's';
          break;
          case 8:
            this.pagouJaneiro = 's';
            this.pagouFevereiro = 's';
            this.pagouMarco = 's';
            this.pagouAbril = 's';
            this.pagouMaio = 's';
            this.pagouJunho = 's';
            this.pagouJulho = 's';
          break;
          case 9:
            this.pagouJaneiro = 's';
            this.pagouFevereiro = 's';
            this.pagouMarco = 's';
            this.pagouAbril = 's';
            this.pagouMaio = 's';
            this.pagouJunho = 's';
            this.pagouJulho = 's';
            this.pagouAgosto = 's';
          break;
          case 10:
            this.pagouJaneiro = 's';
            this.pagouFevereiro = 's';
            this.pagouMarco = 's';
            this.pagouAbril = 's';
            this.pagouMaio = 's';
            this.pagouJunho = 's';
            this.pagouJulho = 's';
            this.pagouAgosto = 's';
            this.pagouSetembro = 's';
          break;
          case 11:
            this.pagouJaneiro = 's';
            this.pagouFevereiro = 's';
            this.pagouMarco = 's';
            this.pagouAbril = 's';
            this.pagouMaio = 's';
            this.pagouJunho = 's';
            this.pagouJulho = 's';
            this.pagouAgosto = 's';
            this.pagouSetembro = 's';
            this.pagouOutubro = 's';
          case 12:
            this.pagouJaneiro = 's';
            this.pagouFevereiro = 's';
            this.pagouMarco = 's';
            this.pagouAbril = 's';
            this.pagouMaio = 's';
            this.pagouJunho = 's';
            this.pagouJulho = 's';
            this.pagouAgosto = 's';
            this.pagouSetembro = 's';
            this.pagouOutubro = 's';
            this.pagouNovembro = 's';
          break;
          default:
            break;
      }
    }
  }

  validaDiaVencimento(aluno: Aluno) {

    let diaVencimento = Number.parseInt(aluno.diaVencMensalidade);
    let hoje = new Date().getDate();
    let mes = new Date().getMonth() +1;

    if(this.pagouJaneiro == 'v') {
      if(mes == 1 && hoje < diaVencimento) {
        this.pagouJaneiro = 'n';
      }
    } 
    if(this.pagouFevereiro == 'v') {
      if(mes == 2 && hoje < diaVencimento) {
        this.pagouFevereiro = 'n';
      }
    } 
    if(this.pagouMarco == 'v') {
      if(mes == 3 && hoje < diaVencimento) {
        this.pagouMarco = 'n';
      }
    }
    if(this.pagouAbril == 'v') {
      if(mes == 1 && hoje < diaVencimento) {
        this.pagouAbril = 'n';
      }
    } 
    if(this.pagouMaio == 'v') {
      if(mes == 2 && hoje < diaVencimento) {
        this.pagouMaio = 'n';
      }
    } 
    if(this.pagouJunho == 'v') {
      if(mes == 3 && hoje < diaVencimento) {
        this.pagouJunho = 'n';
      }
    }
    if(this.pagouJulho == 'v') {
      if(mes == 2 && hoje < diaVencimento) {
        this.pagouJulho = 'n';
      }
    } 
    if(this.pagouAgosto == 'v') {
      if(mes == 3 && hoje < diaVencimento) {
        this.pagouAgosto = 'n';
      }
    }
    if(this.pagouSetembro == 'v') {
      if(mes == 1 && hoje < diaVencimento) {
        this.pagouSetembro = 'n';
      }
    } 
    if(this.pagouOutubro == 'v') {
      if(mes == 2 && hoje < diaVencimento) {
        this.pagouOutubro = 'n';
      }
    } 
    if(this.pagouNovembro == 'v') {
      if(mes == 3 && hoje < diaVencimento) {
        this.pagouNovembro = 'n';
      }
    }
    if(this.pagouDezembro == 'v') {
      if(mes == 3 && hoje < diaVencimento) {
        this.pagouDezembro = 'n';
      }
    }
  }
}
