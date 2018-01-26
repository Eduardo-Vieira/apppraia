import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Produtos } from '../../interface/produtos';

@Injectable()
export class ProdutosModel {

  private tableName = 'produtos';

  private modelo:any;

  constructor(private db: Storage) {
    //abrir Dados do Storage
    db.get(this.tableName).then((data)=>{
      this.modelo = (data!=null) ?  JSON.parse(data) : [];
    });
  }

  autoNumber(){
    return this.modelo.length + 1;
  }

  /**
   * Salvar dados
   * @param data interface
   */
  set(data:Produtos){
    // autoNumber
    data.regidProd = this.autoNumber();
    //add linha no modelo
    this.modelo.push(data);
    //Salvar no storage
    this.db.set(this.tableName,JSON.stringify(this.modelo));
  }

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
   * get modelo
   * @return modelo
   */
  get(){
    return this.modelo;
  }

}
