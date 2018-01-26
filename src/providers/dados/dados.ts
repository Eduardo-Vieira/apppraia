import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DadosProvider {

  private aluguel:any;

  constructor(public http: HttpClient,private storage: Storage) {

  }

  getAluguel(){
    return new Promise(resolve=>{
      this.storage.get('aluguel').then((val) => {
        if(val !=null){
          this.aluguel = JSON.parse(val);
        }else{
          this.aluguel =[];
        }
        resolve(this.aluguel);
      });
    });
  }

  setAluguel(val:any){
    this.aluguel.push(val);
    this.storage.set('aluguel',JSON.stringify(this.aluguel));
  }

}
