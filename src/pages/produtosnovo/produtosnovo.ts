import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Produtos } from '../../interface/produtos';
import { ProdutosModel } from '../../models/produtos/produtos-model';


@IonicPage()
@Component({
  selector: 'page-produtosnovo',
  templateUrl: 'produtosnovo.html',
})
export class ProdutosnovoPage {

  public formdata:Produtos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtos:ProdutosModel) {
    this.formdata = { regidProd:'',
                      descricao:'',
                      isActive:''
                    };
  }

  save(){
    // Save row
    this.produtos.add(this.formdata);
    this.navCtrl.pop();
  }

}
