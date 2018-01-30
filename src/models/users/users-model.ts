import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Users } from '../../interface/users';

@Injectable()
export class UsersModel {

  private tableName = 'users';

  private modelo:any = [];

  constructor(private db: Storage) {

  }

  getTableName(){
    return this.tableName;
  }

  autoNumber(){
    return this.modelo.length + 1;
  }

  /**
   * Salvar dados
   * @param data interface
   */
  add(data:Users){
    // autoNumber
    data.iduser = this.autoNumber();
    //add linha no modelo
    this.modelo.push(data);
    //Salvar no storage
    this.db.set(this.tableName,JSON.stringify(this.modelo));
  }

  /**
   * Atualizar dados
   * @param data
   */
  update(data:Users){
    this.modelo.forEach(e => {
      if(data.iduser == e.iduser){
        //set row para update
        e = data;
        //Salvar no storage
        this.db.set(this.tableName,JSON.stringify(this.modelo));
      }
    });
  }

  remove(data:Users){
    let newarra:any = [];
    this.modelo.forEach(e => {
      if(data.iduser != e.iduser){
        newarra.push(e);
      }
    });
    //Salvar no storage
    this.modelo = newarra;
    this.db.set(this.tableName,JSON.stringify(newarra));
  }

  /**
   * open modelo
   * @return modelo
   */
  open(){
    return new Promise(resolve=>{
      //abrir Dados do Storage
      this.db.get(this.tableName).then((data)=>{
        this.modelo = (data!=null) ?  JSON.parse(data) : [];
        resolve(this.modelo);
      });
    });
  }

}
