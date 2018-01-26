import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutosModel } from '../../models/produtos/produtos-model';
import { ProdutosnovoPage } from '../produtosnovo/produtosnovo';
import { ProdutoseditPage } from '../produtosedit/produtosedit';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  public produtos:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mProduto:ProdutosModel) {

  }

  ionViewWillEnter(){
    this.openModel();
  }

  openModel(){
    this.produtos = this.mProduto.get();
  }

  /**
   * open page
   */
  addItem(){
    this.navCtrl.push(ProdutosnovoPage,{});
  }

  editItem(item:any){
    this.navCtrl.push(ProdutoseditPage,{data:item});
  }
}
