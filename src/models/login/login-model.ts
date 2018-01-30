import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { UsersModel } from '../users/users-model';

@Injectable()
export class LoginModel {

  private tableName = 'auth';

  private modelo:any = [];

  private isLogin:boolean = false;

  constructor(private db: Storage, private users:UsersModel) {
    //criar usuáiro admin caso não exita
    this.db.get(this.users.getTableName()).then((data)=>{
      if(data == null){
        this.users.add({
                  username:'Administrador',
                  login:'admin',
                  password:'admin',
                  isActive:'sim'});
      }
    });
  }

  getIsLogin(){
    return this.isLogin;
  }

  getUsername(){
    return this.modelo.username;
  }

  /**
   * Autentica login
   */
  authLogin(param:any){
   return new Promise(resolve=>{
      this.users.open().then((data:any)=>{
        data.forEach(e => {
          if(e.login == param.login && e.password == param.password){
            this.isLogin = true;
            resolve({result:true, msg:'OK'});
            this.modelo = e;
            this.db.set(this.tableName,JSON.stringify(e));
          }else{
            resolve({result:false, msg:'Credenciais inválidas.'});
          }
        });
      });
    });
  }

  /**
   * Verificar se está logado
   */
  isLogado(){
    return new Promise(resolve=>{
      //abrir Dados do Storage
      this.db.get(this.tableName).then((data)=>{
        let auth:boolean;
        if(data!=null){
          this.modelo = JSON.parse(data);
          auth = true;
          this.isLogin = true;
         }else{
          auth = false;
          this.modelo = [];
        }
        resolve(auth);
      });
    });
  }

  authLogout(){
    this.modelo = [];
    this.isLogin = false;
    //remover no storage
    this.db.remove(this.tableName);
  }

}
