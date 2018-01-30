import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginModel } from '../../models/login/login-model';
import { AluguelPage } from '../aluguel/aluguel';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public formdata:{};

  public errmsg:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public login:LoginModel) {
    this.formdata = {
                    login:'',
                    password:''
                    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doEntrar(){
    this.login.authLogin(this.formdata).then((data:any)=>{
      if(data.result== true){
        this.navCtrl.setRoot(AluguelPage);
      }else{
        this.errmsg = data.msg;
      }
    });
  }
}
