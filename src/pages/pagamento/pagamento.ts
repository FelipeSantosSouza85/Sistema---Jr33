import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pagamento } from '../../domain/pagamento';
import { ProdutoProvider } from '../../providers/produto/produto-service';
import { Produto } from '../../domain/produto';
import { PagamentoProvider } from '../../providers/pagamentos/pagamento-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { PesquisaAlunoPage } from '../aluno/pesquisa-aluno';

@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  public pagamento: Pagamento;
  public produtos: Produto[];
  public valorProduto: number;
  public meses: any[] = [{codigo: '1', descricao: 'Janeiro'},
    {codigo: '2', descricao: 'Fevereiro'},
    {codigo: '3', descricao: 'Março'},
    {codigo: '4', descricao: 'Abril'},
    {codigo: '5', descricao: 'Maio'},
    {codigo: '6', descricao: 'Junho'},
    {codigo: '7', descricao: 'Julho'},
    {codigo: '8', descricao: 'Agosto'},
    {codigo: '9', descricao: 'Setembro'},
    {codigo: '10', descricao: 'Outubro'},
    {codigo: '11', descricao: 'Novembro'},
    {codigo: '12', descricao: 'Dezembro'}];

  public exibeMes: boolean;
  public formaPagamento: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _produtoService: ProdutoProvider,
    private _pagamentoService: PagamentoProvider,
    private _alertCtrl: AlertController
  ) {
    this.pagamento = this.navParams.get('pagamento');

    if(!this.pagamento) {
      this.pagamento = new Pagamento();
    }

    this._produtoService.getProdutos().then((data) => {
      this.produtos = data;
    });
    this.exibeMes = false;

  }

  selecionaProduto(tipo: any) {
    
    let produtoNome = '';
    let valor = 0;

    if(tipo == '1' || tipo == '2') {
      this.exibeMes = true;
    } else {
      this.exibeMes = false;
    }
    this.produtos.forEach(function(produto, chave){
      if(produto.tipo == tipo) {

        produtoNome = produto.descricao;
        valor = produto.valor;
      }
    });
    this.valorProduto = valor;
  }

  selecionaMes(mes: any) {
    
    console.log(mes);
  }

  salvarPagamento() {

    this.pagamento.formaPagamento = this.formaPagamento;
    this.pagamento.valorPagamento = this.valorProduto;

    this._pagamentoService.createPagamento(this.pagamento)
          this._alertCtrl
            .create({
              title: 'Pagamento realizado!',
              buttons: [{ text: 'OK!'}],
              cssClass: 'alertCustomCss'
            }).present();

            this.pagamento = new Pagamento;
            this.navCtrl.setRoot(PesquisaAlunoPage);
    
  }

}
