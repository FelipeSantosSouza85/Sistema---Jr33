import { Injectable } from '@angular/core';
import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);


@Injectable()
export class UsuarioProvider {

  data: any;
  db: any;
  remote: any;
  remote2: any;

  constructor() {

    this.db = new PouchDB('usuario');

    //this.remote = 'http://localhost:5984/usuario';
    this.remote2 = 'http://35.237.238.192:8888/usuario';

    let options = {
      live: true,
      retry: true,
      continuous: true,
    };

    //this.db.sync(this.remote, options);
    this.db.sync(this.remote2, options);
  }

  public createUsuario(usuario: any) {
    this.db.post(usuario);
  }

  public pesquisaUsuario(login: string, senha: string) {
    
   return this.db.find({
     selector: {login: login, senha: senha }
   })
  }

  public getUsuarios() {

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
