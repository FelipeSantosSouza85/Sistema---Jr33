import { Injectable } from '@angular/core';
import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);


@Injectable()
export class PagamentoProvider {

  data: any;
  db: any;
  remote: any;
  remote2: any;

  constructor() {

    this.db = new PouchDB('pagamentos');

    //this.remote = 'http://localhost:5984/pagamentos';
    this.remote2 = 'http://35.237.238.192:8888/pagamentos';

    let options = {
      live: true,
      retry: true,
      continuous: true,
    };

    //this.db.sync(this.remote, options);
    this.db.sync(this.remote2, options);
  }

  public createPagamento(pagamento: any) {
    this.db.post(pagamento);
  }

  public pesquisaPagamentosAluno(cpfAluno: string) {
    
    let ano = new Date().getFullYear();

    this.db.createIndex({
      index: {
        fields: ['cpfAluno']
      }
    }).then(function () {
      
    }).catch(function (err) {
      console.log(err);
    });

    return this.db.find({
      selector: {
          cpfAluno: {$eq: cpfAluno},
          anoPagamento: {$eq: ano}

        },
        sort: ['cpfAluno']
    });
  }

  public pesquisaAlunoNome(nome: string) {
    
    return this.db.find({
      selector: {
        "nome": {"$regex": "^"+nome}
      }
    })
   }

   public pesquisaAlunoCpf(cpfAluno: string) {
    
    return this.db.find({
      selector: {
        cpf: {$eq: cpfAluno}
      }
    })
   }

  public getProdutos() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];
        result.rows.map((row) => {
          this.data.push(row.doc);
        });
        resolve(this.data);
      this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        }); 
      }).catch((error) => {
        console.log(error);
      }); 
    }); 
  }

  public handleChange(change: any) {

    let changedDoc = null;
    let changedIndex = null;
 
    this.data.forEach((doc, index) => {
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
    });

    //Documento deletado
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } else {
      if(changedDoc){ 
        //Documento atualizado
        this.data[changedIndex] = change.doc;
      } else { 
        //Documento adicionado
        this.data.push(change.doc); 
      }
    }
  }

}
