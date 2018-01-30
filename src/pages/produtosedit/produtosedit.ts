import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Produtos } from '../../interface/produtos';
import { ProdutosModel } from '../../models/produtos/produtos-model';

@IonicPage()
@Component({
  selector: 'page-produtosedit',
  templateUrl: 'produtosedit.html',
})
export class ProdutoseditPage {

  public formdata:Produtos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtos:ProdutosModel) {
    this.formdata = { regidProd: 0,
                      descricao:'',
                      isActive:''
                    };
  }

  ionViewWillEnter(){
    this.formdata = this.navParams.get('data');
  }

  save(){
    //update row
    this.produtos.update(this.formdata);
    this.navCtrl.pop();
  }

}
