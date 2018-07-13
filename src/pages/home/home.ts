import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario-service';
import { Usuario } from '../../domain/usuario';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { AlunoPage } from '../aluno/aluno';
import { PesquisaAlunoPage } from '../aluno/pesquisa-aluno';
import { PagamentoPage } from '../pagamento/pagamento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuario = Usuario;
  public novoAluno = {titulo: 'Novo Aluno', componente: AlunoPage};
  public pesquisaAluno = {titulo: 'Pesquisar Aluno', componente: PesquisaAlunoPage};
  public incluirPagamento = {titulo: 'Realizar Pagamento', componente: PagamentoPage};

  constructor(
    public navCtrl: NavController,
    public usuarioService: UsuarioProvider,
    public navParams: NavParams,
    
  ) {

    this.usuario = this.navParams.get('usuario');
    console.log(this.usuario);
  }

  public salvarUsuario() {
    this.usuarioService.createUsuario(this.usuario);
  };

  abrePagina(novoAluno) {

    switch (novoAluno) {
      case 'novoAluno':
        this.navCtrl.push(this.novoAluno.componente);
        break;
      case 'pesquisaAluno':
        this.navCtrl.push(this.pesquisaAluno.componente);
        break;
      case 'incluirPag':
      this.navCtrl.push(this.incluirPagamento.componente);
      break;
        
      default:
        break;
    }
  }

}
