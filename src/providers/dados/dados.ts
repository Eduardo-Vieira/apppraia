import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DadosProvider {

  constructor(public http: HttpClient,private storage: Storage) {
  
  }

  getAluguel(){
    this.storage.get('age').then((val) => {
      return JSON.parse(val);
    });
  }  
  
}
