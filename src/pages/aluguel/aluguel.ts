import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { AlertController } from 'ionic-angular';

import { AluguelcadPage } from '../aluguelcad/aluguelcad';
import { AluguelModel } from '../../models/aluguel/aluguel-model';

@IonicPage()
@Component({
  selector: 'page-aluguel',
  templateUrl: 'aluguel.html',
})
export class AluguelPage {

  public aluguel:any;
  public regmsg:boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public mAluguel:AluguelModel) {

              }

  openModel(){
    // Open dados
    this.mAluguel.open().then((data:any)=>{
      if(data && data!=[])
      {
        this.regmsg = false;
        this.aluguel = this.verificarFechamento(data);
      }
    });
  }

  verificarFechamento(data){
    let r:any=[];
    data.forEach(e => {
      //verificar se não esta fechado
      if(e.isDevolvido.toLowerCase() != "sim"){
        r.push(e);
      }
    });
    return r;
  }

  ionViewWillEnter(){
    this.openModel();
      //Varificar se tem algum fora do tempo fim
      setInterval(() => {
         this.atualizarStatus();
      }, 3000);
  }

  addAluguel(){
    this.navCtrl.push(AluguelcadPage,{});
  }

  atualizarStatus(){
    if(this.aluguel && this.aluguel.length > 0){
      this.aluguel.forEach(e => {
        let d = e.data.split('/');
        let hora = new Date(d[1].concat('/', d[0], '/', d[2], ' ', e.tempofim));
        let r = new Date();
        if(r.getTime() >= hora.getTime() &&  e.isPago==''){
          e.status = 'danger';
        }else{
          e.status ='';
        }
      });
    }
  }

  deleteAluguel(item:any){
    let prompt = this.alertCtrl.create({
      title: 'Fecha Aluguel',
      message: "Você deseja Remover essa conta de Aluguel? Caso queira digite sim na caixa de texto.",
      inputs: [
        {
          name: 'Fechamento',
          placeholder: 'Sim'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            if(data.toLowerCase()=='sim'){
              this.aluguel = this.verificarFechamento(this.mAluguel.remove(item));
            }
          }
        }
      ]
    });
    prompt.present();
  }

  fechaAluguel(item:any){
    let prompt = this.alertCtrl.create({
      title: 'Fecha Aluguel',
      message: "Você deseja Fecha essa conta de Aluguel? Caso queira digite sim na caixa de texto.",
      inputs: [
        {
          name: 'Fechamento',
          placeholder: 'Sim'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            if(data.toLowerCase()=='sim'){
              this.aluguel.forEach(e => {
                if(e.regid == item.regid){
                  e.isDevolvido = data.Fechamento;
                  this.mAluguel.update(e); //Salvar no db
                }
              });
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
