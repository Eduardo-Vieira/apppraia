import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Produtos } from '../../interface/produtos';

@Injectable()
export class ProdutosModel {

  private tableName = 'produtos';

  private modelo:any;

  constructor(private db: Storage) {

  }

  autoNumber(){
    return this.modelo.length + 1;
  }

  /**
   * Salvar dados
   * @param data interface
   */
  add(data:Produtos){
    // autoNumber
    data.regidProd = this.autoNumber();
    //add linha no modelo
    this.modelo.push(data);
    //Salvar no storage
    this.db.set(this.tableName,JSON.stringify(this.modelo));
  }

  /**
   * Atualizar dados
   * @param data
   */
  update(data:Produtos){
    this.modelo.forEach(e => {
      if(data.regidProd == e.regidProd){
        //set row para update
        e = data;
        //Salvar no storage
        this.db.set(this.tableName,JSON.stringify(this.modelo));
      }
    });
  }

  remove(data:Produtos){
    let newarra:any = [];
    this.modelo.forEach(e => {
      if(data.regidProd != e.regidProd){
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
