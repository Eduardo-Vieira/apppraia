import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AluguelModel } from '../../models/aluguel/aluguel-model';

import { Aluguel } from '../../interface/aluguel';
import { Produtos } from '../../interface/produtos';

import { ProdutosModel } from '../../models/produtos/produtos-model';

@IonicPage()
@Component({
  selector: 'page-aluguelcad',
  templateUrl: 'aluguelcad.html',
})
export class AluguelcadPage {

  public formdata:Aluguel;

  public produtos:Produtos;

  public selectOptionsProduto:any;

  public selectOptionsTempo:any;

  public isTimefull:boolean = false;

  public tempo:any = [{temp:'A', time:'30 min', value:'20,00'},
                      {temp:'B', time:'60 min', value:'30,00'},
                      {temp:'C', time:'full', value:'full'},
                      {temp:'D', time:'Diversos', value:'Diversos'},
                     ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mAluguel:AluguelModel,
              public mProduto:ProdutosModel) {
                this.formdata = {regid:'',
                  data:'',
                  produto:'',
                  cod:'',
                  codTempo:'',
                  tempo:'',
                  tempoInicio:'',
                  tempofim:'',
                  valoraluguel:'',
                  cliente:'',
                  qtd:'',
                  deposito:'',
                  isDevolvido:'',
                  status:'',
                  obs:''};

                  this.selectOptionsProduto = {
                    title: 'Produtos',
                    subTitle: 'Selecione um produto',
                    mode: 'md'
                  };

                  this.selectOptionsTempo = {
                    title: 'Tempo',
                    subTitle: 'Selecione um Tempo de uso do produto',
                    mode: 'md'
                  };
  }

  ionViewWillEnter(){
    this.openModel();
  }

  openModel(){
    this.produtos = this.mProduto.get();
  }

  setTempo(){
    let h = new Date();
    this.formdata.data = h.toLocaleDateString();
    switch (this.formdata.codTempo) {
      case 'A':
        this.isTimefull = false;
        this.formdata.tempo ='30 min';
        this.formdata.tempoInicio = h.toLocaleTimeString();
        this.formdata.tempofim = this.calcHora(h,30); //'30 min';
        this.formdata.valoraluguel = '20,00'
        break;
      case 'B':
        this.isTimefull = false;
        this.formdata.tempo ='60 min';
        this.formdata.tempoInicio = h.toLocaleTimeString();
        this.formdata.tempofim = this.calcHora(h,60); //'60 min';
        this.formdata.valoraluguel = '30,00'
        break;
      case 'D':
        this.isTimefull = true;
        this.formdata.tempo ='0 min';
        this.formdata.tempoInicio = h.toLocaleTimeString();
        this.formdata.tempofim = h.toLocaleTimeString(); //'0 min';
        this.formdata.valoraluguel = ''
        break;
      default:
        this.isTimefull = true;
        this.formdata.tempo ='9 h';
        this.formdata.tempoInicio = h.toLocaleTimeString();
        this.formdata.tempofim = this.formdata.tempofim = this.calcHora(h,9*60); //'9 min';
        this.formdata.valoraluguel ='';
        break;
    }
  }

  save(){
    //console.log(this.formdata);
    this.mAluguel.set(this.formdata);
    this.navCtrl.pop();
  }
  calcHora(h,min){
    let dt = new Date(h.getTime() + min*60000);
    return dt.toLocaleTimeString();
  }
}
