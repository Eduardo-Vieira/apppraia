import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Aluguel } from '../../interface/aluguel';

@Injectable()
export class AluguelModel {

  private tableName = 'aluguel';

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
  set(data:Aluguel){
    // autoNumber
    data.regid = this.autoNumber();
    //add linha no modelo
    this.modelo.push(data);
    //Salvar no storage
    this.db.set(this.tableName,JSON.stringify(this.modelo));
  }

  remove(data:Aluguel){
    let newarra:any = [];
    this.modelo.forEach(e => {
      if(data.regid != e.regid){
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
