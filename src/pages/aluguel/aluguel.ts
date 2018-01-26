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

  // public aluguel:any = [
  //   {id:1, data:'25/01/2018', produto:'Sup', cod:'1', codTempo:'A',tempo:'00:30:00',tempoInicio:'20:50:00', tempofim:'21:40:00',valoraluguel:'20,00',cliente:'Eduardo', qtdColete:'2', deposito:'20,00', isPago:'', status:''},
  //   {id:2, data:'25/01/2018', produto:'Sup', cod:'1', codTempo:'A',tempo:'00:30:00',tempoInicio:'20:50:00', tempofim:'21:40:00',valoraluguel:'20,00',cliente:'Eduardo', qtdColete:'2', deposito:'20,00', isPago:'', status:''},
  //   {id:3, data:'25/01/2018', produto:'Sup', cod:'1', codTempo:'A',tempo:'00:30:00',tempoInicio:'20:08:00', tempofim:'20:38:00',valoraluguel:'20,00',cliente:'Eduardo', qtdColete:'2', deposito:'20,00', isPago:'', status:''},
  //   {id:4, data:'25/01/2018', produto:'Sup', cod:'1', codTempo:'A',tempo:'00:30:00',tempoInicio:'20:08:00', tempofim:'',valoraluguel:'20,00',cliente:'Eduardo', qtdColete:'2', deposito:'20,00', isPago:'', status:''},
  //   {id:5, data:'25/01/2018', produto:'Sup', cod:'1', codTempo:'A',tempo:'00:30:00',tempoInicio:'20:08:00', tempofim:'20:38:00',valoraluguel:'20,00',cliente:'Eduardo', qtdColete:'2', deposito:'20,00', isPago:'', status:''},
  //   {id:6, data:'25/01/2018', produto:'Sup', cod:'1', codTempo:'A',tempo:'00:30:00',tempoInicio:'20:08:00', tempofim:'20:38:00',valoraluguel:'20,00',cliente:'Eduardo', qtdColete:'2', deposito:'20,00', isPago:'', status:''},
  //   {id:7, data:'25/01/2018', produto:'Caiak', cod:'2', codTempo:'A',tempo:'00:30:00',tempoInicio:'20:08:00', tempofim:'',valoraluguel:'20,00',cliente:'Nelson', qtdColete:'3', deposito:'10,00', isPago:'', status:''},
  // ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public mAluguel:AluguelModel) {
  }

  openModel(){
    this.aluguel = this.mAluguel.get();
  }

  ionViewWillEnter(){
    this.openModel();
    console.log( this.aluguel);
    //Varificar se tem algum fora do tempo fim
    // setInterval(() => {
    //    this.atualizarStatus();
    // }, 3000);
  }

  addAluguel(){
    this.navCtrl.push(AluguelcadPage,{});
  }

  atualizarStatus(){
    if(this.aluguel.length > 0){
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
    this.mAluguel.remove(item);
    this.openModel();
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
            this.aluguel.forEach(e => {
              if(e.id == item.id){
                e.isPago = data.Fechamento;
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
